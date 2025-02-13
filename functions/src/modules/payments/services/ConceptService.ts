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
}