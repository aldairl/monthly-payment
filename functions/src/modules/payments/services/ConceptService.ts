import mongoose from "mongoose";
import Concept, { IConcept } from "../models/Concept";
import PaymentConcepts, { IPaymentConcept } from "../models/PaymentConcepts";

export class ConceptService {
    async getAllConcepts(): Promise<IConcept[]> {
        return await Concept.find()
    }

    async createConcept(conceptData: Partial<IConcept>) {
        const conceptSaved = new Concept(conceptData)
        return await conceptSaved.save()
    }

    async updateConcept(id: string, updatedData: Partial<IConcept>): Promise<IConcept | null> {
        return await Concept.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteConcept(id: string): Promise<IConcept> {
        const result = await Concept.findByIdAndDelete(id)
        if (!result) {
            throw new Error('Can not delete the concept')
        }
        return result
    }

    async createPaymentConcepts(paymentId: mongoose.Types.ObjectId, concepts: Partial<IPaymentConcept[]>, session: mongoose.ClientSession) {
        const paymentConcepts = concepts.map(concept => ({
            ...concept,
            payment_id: paymentId
        }))

        return await PaymentConcepts.insertMany(paymentConcepts, { session })
    }

    async deletePaymentConcepts(paymentId: mongoose.Types.ObjectId, session: mongoose.ClientSession) {
        return PaymentConcepts.deleteMany({ payment_id: paymentId }, { session })
    }

    async getConceptsByPayment(paymentId: string): Promise<IConcept[]> {
        return await PaymentConcepts.find({ payment_id: paymentId })
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