import mongoose from "mongoose"
import PaymentConcepts, { IPaymentConcept } from "../models/PaymentConcepts";

export class PaymentConceptService {

    async getAllPaymentConcepts(): Promise<any[]> {
        return await PaymentConcepts.find()
    }

    async getPaymentConceptById(id: string): Promise<any | null> {
        return await PaymentConcepts.findById(id)
    }

    async createPaymentConcept(conceptData: Partial<any>) {
        const conceptSaved = new PaymentConcepts(conceptData)
        return await conceptSaved.save()
    }

    async updatePaymentConcept(id: string, updatedData: Partial<IPaymentConcept>): Promise<any | null> {
        return await PaymentConcepts.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async createPaymentConcepts(paymentId: mongoose.Types.ObjectId, concepts: Partial<IPaymentConcept[]>, session: mongoose.ClientSession) {
        const paymentConcepts = concepts.map(concept => ({
            ...concept,
            payment_id: paymentId
        }))

        return await PaymentConcepts.insertMany(paymentConcepts, { session })
    }

    async deletePaymentConceptById(paymentId: string) : Promise<IPaymentConcept> {
        const result = await PaymentConcepts.findByIdAndDelete(paymentId)

        if (!result) {
            throw new Error('Can not delete the concept')
        }
        return result
    }

    async deletePaymentConcepts(paymentId: mongoose.Types.ObjectId, session: mongoose.ClientSession) {
        return PaymentConcepts.deleteMany({ payment_id: paymentId }, { session })
    }

    async getConceptsByPayment(paymentId: string): Promise<IPaymentConcept[]> {
        return await PaymentConcepts.find({ payment_id: paymentId })
    }

    async updateConceptsByPaymentId(paymentId: string, paymentConcepts: Partial<IPaymentConcept[]>, session: mongoose.ClientSession): Promise<IPaymentConcept[] | []> {
        // go for through all concepts and check if concept has _id to update or not we need to create a new one

        const conceptsUpdated = []

        for (const concept of paymentConcepts) {
            if (!concept) continue;

            const { _id, deleted } = concept;

            if (deleted) {
                await this.deletePaymentConceptById(_id as string)
            }
            else if (_id) {
                await PaymentConcepts.findByIdAndUpdate(_id, concept, { new: true, session })
                conceptsUpdated.push(concept)
            } else {
                const newPaymentConcept = await PaymentConcepts.create([{...concept, payment_id: paymentId}], { session })
                conceptsUpdated.push(newPaymentConcept[0])
            }
        }
        return conceptsUpdated
    }

    async getTotalPaymentConceptsByBox(id: string): Promise<any> {

        const boxId = new mongoose.Types.ObjectId(id)
        const incomes = await PaymentConcepts.aggregate(
            [
                {
                    $addFields: {
                        payment_id: { $toObjectId: "$payment_id" }  // Forzamos a ObjectId
                    }
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: 'payment_id',
                        foreignField: '_id',
                        as: 'payment'
                    }
                },
                {
                    $unwind: '$payment'
                },
                {
                    $match: {
                        'payment.box': boxId,
                        'payment.type': 'income'
                    }
                },
                // 3. Hacer lookup para traer la información del concepto
                {
                    $lookup: {
                        from: 'concepts',
                        localField: 'concept_id',
                        foreignField: '_id',
                        as: 'concept'
                    }
                },
                {
                    $unwind: '$concept'
                },
                // 4. Agrupar por concepto y sumar los montos
                {
                    $addFields: {
                        'concept.priority': { $ifNull: ['$concept.priority', 1] }
                    }
                },
                {
                    $group: {
                        _id: '$concept.name',
                        totalAmount: { $sum: '$amount' },
                        priority: { $first: '$concept.priority' }
                    }
                },
            ]
        )

        const expenses = await PaymentConcepts.aggregate(
            [
                {
                    $addFields: {
                        payment_id: { $toObjectId: "$payment_id" }  // Forzamos a ObjectId
                    }
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: 'payment_id',
                        foreignField: '_id',
                        as: 'payment'
                    }
                },
                {
                    $unwind: '$payment'
                },
                {
                    $match: {
                        'payment.box': boxId,
                        'payment.type': 'expense'
                    }
                },
                // 3. Hacer lookup para traer la información del concepto
                {
                    $lookup: {
                        from: 'concepts',
                        localField: 'concept_id',
                        foreignField: '_id',
                        as: 'concept'
                    }
                },
                {
                    $unwind: '$concept'
                },
                // 4. Agrupar por concepto y sumar los montos
                {
                    $addFields: {
                        'concept.priority': { $ifNull: ['$concept.priority', 1] }
                    }
                },
                {
                    $group: {
                        _id: '$concept.name',
                        totalAmount: { $sum: '$amount' },
                        priority: { $first: '$concept.priority' }
                    }
                },
            ]
        )

        return { incomes, expenses }
    }
}