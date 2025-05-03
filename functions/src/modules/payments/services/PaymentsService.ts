import mongoose from "mongoose"
import { CashFlowService } from "../../cashFlow/service/CashFlowService"
import Payment, { IPayment } from "../models/Payments"
import { PaymentConceptService } from './PaymentConcepts'
import { IPaymentConcept } from "../models/PaymentConcepts"
import { ReceiptService } from "./ReceiptServivice"
// import { BeneficiaryService } from "../../beneficiaries/services/BeneficiaryService"

const cashFlowService = new CashFlowService()
const paymentConceptService = new PaymentConceptService()
const receiptService = new ReceiptService()

// const beneficiaryService = new BeneficiaryService()

export class PaymentService {
    async getAllPayments(query: object): Promise<IPayment[]> {
        return await Payment.find(query)
    }

    async getPaymentById(id: string): Promise<IPayment | null> {

        const concepts = await paymentConceptService.getConceptsByPayment(id)
        const payment = await Payment.findById(id)
            .populate('payer', 'name lastname identification')
            .populate('box', 'name')

        return { ...payment?.toObject(), concepts } as unknown as IPayment
    }

    async createPayment(paymentData: Partial<IPayment>, session: mongoose.ClientSession): Promise<IPayment> {
        const receipt = await this.generateReceipt(paymentData.type || 'income')
        paymentData.receipt = receipt
        const paymentSaved = await Payment.create([{ ...paymentData }], { session })
        return paymentSaved[0]
    }

    async updatePayment(id: string, updatedData: Partial<IPayment>, session: mongoose.ClientSession): Promise<IPayment | null> {
        const updated = await Payment.findOneAndUpdate({ _id: id }, updatedData, { new: true, session })
        return updated
    }

    async deletePayment(id: string, session: mongoose.ClientSession): Promise<IPayment> {
        const result = await Payment.findByIdAndDelete(id).session(session)
        if (!result) {
            throw new Error('Can not delete the document')
        }
        return result
    }

    async generateReceipt(type: string): Promise<string> {
        const currentReceipt = await receiptService.getNextSequence(type)
        return currentReceipt.toString()
    }

    async deletePaymentTransaction(id: string): Promise<{ deleted: boolean }> {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            // Detele payment
            const result = await this.deletePayment(id, session)

            // delete payment concepts
            await paymentConceptService.deletePaymentConcepts(result.id, session)

            // Update cash flow
            await cashFlowService.updateCashFlow(result.box, -Number(result.amount), result.type, session)

            // confirm transaction
            await session.commitTransaction()
            session.endSession()
            return { deleted: true }
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            return { deleted: false }
        }
    }

    async createPaymentTransaction(paymentData: Partial<IPayment>, concepts: Partial<IPaymentConcept[]>) {
        // start transaction
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const paymentSaved = await this.createPayment(paymentData, session)
            await cashFlowService.updateCashFlow(paymentSaved.box, Number(paymentSaved.amount), paymentSaved.type, session)

            await paymentConceptService.createPaymentConcepts(paymentSaved.id, concepts, session)

            await session.commitTransaction()
            session.endSession()
            return paymentSaved
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }

    async updatePaymentTransaction(id: string, paymentData: Partial<IPayment>, paymentConcepts: Partial<IPaymentConcept[]>) {
        // start transaction
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const paymentEdited = await this.updatePayment(id, paymentData, session)
            if (paymentEdited) {
                await paymentConceptService.updateConceptsByPaymentId(paymentEdited._id as string, paymentConcepts, session)
            }

            await session.commitTransaction()
            session.endSession()
            return paymentEdited
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }

    async getLastBeneficiaryPayment(cc: string): Promise<any | null> {
        // seaech beneficiary

        const lastPayment = await Payment.aggregate([
            // Relacionar con "beneficiaries" (payer)
            {
                $lookup: {
                    from: 'beneficiaries', // Nombre real de la colección "User"
                    localField: 'payer',
                    foreignField: '_id',
                    as: 'payer'
                }
            },
            { $unwind: '$payer' }, // Convertir array en objeto
            { $match: { 'payer.identification': cc } }, // Filtrar por identificación del payer
            { $sort: { creation_date: -1 } }, // Ordenar por fecha de creación (descendente)
            { $limit: 1 }, // Solo traer el último pago

            // Relacionar con "boxes" usando "box_id"
            {
                $lookup: {
                    from: 'boxes', // Nombre de la colección "box"
                    localField: 'box',
                    foreignField: '_id',
                    as: 'box'
                }
            },
            { $unwind: '$box' }, // Convertir array en objeto

            // Relacionar con "paymentconcepts" usando "id" de "Payments" con "payment_id"
            {
                $lookup: {
                    from: 'paymentconcepts', // Nombre de la colección de conceptos de pago
                    localField: '_id', // ID del pago en Payments
                    foreignField: 'payment_id', // Campo de referencia en paymentconcepts
                    as: 'concepts'
                }
            },

            // Relacionar con "concepts" para obtener el nombre del concepto
            {
                $lookup: {
                    from: 'concepts', // Nombre de la colección de conceptos
                    localField: 'concepts.concept_id', // Campo de referencia en paymentconcepts
                    foreignField: '_id', // Campo en concepts
                    as: 'conceptDetails'
                }
            },

            // Unir los detalles de conceptos a cada concepto en el array
            {
                $addFields: {
                    concepts: {
                        $map: {
                            input: '$concepts',
                            as: 'concept',
                            in: {
                                amount: '$$concept.amount',
                                month: '$$concept.month',
                                details: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$conceptDetails',
                                                as: 'cd',
                                                cond: { $eq: ['$$cd._id', '$$concept.concept_id'] }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            },

            // Seleccionar los campos a devolver
            {
                $project: {
                    amount: 1,
                    type: 1,
                    creation_date: 1,
                    'payer._id': 1,
                    'payer.name': 1,
                    'payer.lastname': 1,
                    'payer.identification': 1,
                    'payer.temple': 1,
                    'payer.cellphone': 1,
                    'box.name': 1, // Suponiendo que "box" tiene un campo "name"
                    'box.location': 1, // Otro campo ejemplo de "box"
                    'concepts.concept_id': 1,
                    'concepts.amount': 1,
                    'concepts.month': 1,
                    'concepts.details.name': 1 // Nombre del concepto desde "concepts"
                }
            }
        ])

        return lastPayment
    }

    async getPaymentDetailsByBox(id: string): Promise<any> {
        const boxId = new mongoose.Types.ObjectId(id)

        const paymentDetails = await Payment.aggregate([
            {
                $match: { box: boxId }   // Filtra los pagos de la box
            },
            {
                $lookup: {
                    from: 'beneficiaries',
                    localField: 'payer',
                    foreignField: '_id',
                    as: 'payerInfo'
                }
            },
            { $unwind: '$payerInfo' },   // Extrae la info del payer
            {
                $lookup: {
                    from: 'paymentconcepts',
                    localField: '_id',
                    foreignField: 'payment_id',
                    as: 'conceptPayments'
                }
            },
            {
                $lookup: {
                    from: 'concepts',
                    localField: 'conceptPayments.concept_id',
                    foreignField: '_id',
                    as: 'concepts'
                }
            },
            {
                $lookup: {
                    from: 'boxes',
                    localField: 'box',
                    foreignField: '_id',
                    as: 'boxInfo'
                }
            },
            { $unwind: '$boxInfo' },  // Solo es una box
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    type: 1,
                    payer: { $concat: ['$payerInfo.name', ' ', { $ifNull: ['$payerInfo.lastname', ''] }] },
                    identification: '$payerInfo.identification',
                    concepts: { $map: { input: '$concepts', as: 'c', in: '$$c.name' } },
                    box: '$boxInfo.name',
                    creation_date: 1,
                    months: { $map: { input: '$conceptPayments', as: 'cp', in: '$$cp.month' } },
                    years: { $map: { input: '$conceptPayments', as: 'cp', in: { $toString: '$$cp.year' } } },
                    amounts: { $map: { input: '$conceptPayments', as: 'cp', in: { $toString: '$$cp.amount' } } }
                }
            },
            {
                $addFields: {
                    concepts: {
                        $reduce: {
                            input: "$concepts",
                            initialValue: "",
                            in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", ", "] }, "$$this"] }
                        }
                    },
                    months: {
                        $reduce: {
                            input: "$months",
                            initialValue: "",
                            in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", ", "] }, "$$this"] }
                        }
                    },
                    years: {
                        $reduce: {
                            input: "$years",
                            initialValue: "",
                            in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", ", "] }, "$$this"] }
                        }
                    },
                    amounts: {
                        $reduce: {
                            input: "$amounts",
                            initialValue: "",
                            in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", ", "] }, "$$this"] }
                        }
                    }

                }
            }
        ])

        return paymentDetails
    }
}