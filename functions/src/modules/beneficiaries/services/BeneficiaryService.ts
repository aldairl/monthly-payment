import BeneficiaryModel, { IBeneficiary } from "../models/BeneficiaryModel"


export class BeneficiaryService {
    async getAllBeneficiaries(): Promise<IBeneficiary[]> {
        return await BeneficiaryModel.find()
    }

    async getBeneficiaryById(id: string): Promise<IBeneficiary | null> {
        return await BeneficiaryModel.findById(id)
    }

    async getBeneficiaryByDNI(identification: string): Promise<IBeneficiary[] | null> {
        return await BeneficiaryModel.find({ identification })
    }

    async createBeneficiary(beneficiaryData: Partial<IBeneficiary>): Promise<IBeneficiary> {
        const beneficiary = new BeneficiaryModel(beneficiaryData)
        return await beneficiary.save()
    }

    async updateBeneficiary(id: string, updatedData: Partial<IBeneficiary>): Promise<IBeneficiary | null> {
        return await BeneficiaryModel.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteBeneficiary(id: string): Promise<object> {
        const result = await BeneficiaryModel.findByIdAndDelete(id)
        return { deleted: result !== null }
    }

    async getBeneficiaryByDniOrName(dniOrName: string) {

        const query = {
            $or: [
                { dni: dniOrName },  // Coincidencia exacta en dni
                { name: { $regex: `.*${dniOrName}.*`, $options: 'i' } } // Búsqueda parcial y case insensitive en name
            ]
        };

        const beneficiaries = await BeneficiaryModel.find(query);
        return beneficiaries
    }

    async getBeneficiaryandLastPayment(dniOrName: string): Promise<any | null> {
        // seaech beneficiary
        const pipeline: any[] = [
            {
                $match: {
                    $or: [
                        { identification: dniOrName }, // Coincidencia exacta en dni
                        { name: { $regex: `.*${dniOrName}.*`, $options: 'i' } } // Coincidencia parcial y case-insensitive en name
                    ]
                }
            },
            {
                $lookup: {
                    from: 'payments', // Nombre de la colección "payments"
                    localField: '_id',
                    foreignField: 'payer',
                    as: 'payments'
                }
            },
            {
                $unwind: {
                    path: '$payments',
                    preserveNullAndEmptyArrays: true
                }
            },
            { $sort: { 'payments.creation_date': -1 } }, // Ordenar por fecha de creación descendente
            {
                $set: {
                    lastPayment: {
                        $ifNull: ['$payments', {}]  // O {} si prefieres un objeto vacío
                    }
                }
            },
            // Relacionar con boxes usando "box_id" de "Payments" con "_id" de "boxes"
            {
                $lookup: {
                    from: 'boxes', // Nombre de la colección de cajas
                    localField: 'payments.box', // ID de la caja en Payments
                    foreignField: '_id', // Campo de referencia en boxes
                    as: 'box'
                }
            },
            {
                $unwind: {
                    path: '$box',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $set: {
                    lastPayment: {
                        $ifNull: ['$box', {}]  // O {} si prefieres un objeto vacío
                    }
                }
            },
            // Relacionar con "paymentconcepts" usando "id" de "Payments" con "payment_id"
            {
                $lookup: {
                    from: 'paymentconcepts', // Nombre de la colección de conceptos de pago
                    localField: 'payments._id', // ID del pago en Payments
                    foreignField: 'payment_id', // Campo de referencia en paymentconcepts
                    as: 'concepts'
                }
            },

            // // Relacionar con "concepts" para obtener el nombre del concepto
            {
                $lookup: {
                    from: 'concepts', // Nombre de la colección de conceptos
                    localField: 'concepts.concept_id', // Campo de referencia en paymentconcepts
                    foreignField: '_id', // Campo en concepts
                    as: 'conceptDetails'
                }
            },

            // // Unir los detalles de conceptos a cada concepto en el array
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
            // { $limit: 1 }, // Obtener solo el último pago
        ]

        const lastPayment = await BeneficiaryModel.aggregate(pipeline)

        return lastPayment
    }
}