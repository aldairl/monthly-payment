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

    async getBeneficiaryandLastPayment(cc: string): Promise<any | null> {
        // seaech beneficiary

        const lastPayment = await BeneficiaryModel.aggregate([

            { $match: { 'identification': cc } }, // Filtrar por identificación del beneficiario            
            // Relacionar con "payments" usando "payer"
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
            }, // Convertir array en objeto
            { $sort: { 'payments.creation_date': -1 } }, // Ordenar por fecha de creación descendente
            { $limit: 1 }, // Obtener solo el último pago

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

            // // Seleccionar los campos a devolver
            // {
            //     $project: {
            //         amount: 1,
            //         type: 1,
            //         creation_date: 1,
            //         'payer._id': 1,
            //         'payer.name': 1,
            //         'payer.lastname': 1,
            //         'payer.identification': 1,
            //         'payer.temple': 1,
            //         'payer.cellphone': 1,
            //         'box.name': 1, // Suponiendo que "box" tiene un campo "name"
            //         'box.location': 1, // Otro campo ejemplo de "box"
            //         'concepts.concept_id': 1,
            //         'concepts.amount': 1,
            //         'concepts.month': 1,
            //         'concepts.details.name': 1 // Nombre del concepto desde "concepts"
            //     }
            // }
        ])

        return lastPayment
    }
}