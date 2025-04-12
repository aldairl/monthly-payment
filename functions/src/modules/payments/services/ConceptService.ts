import Concept, { IConcept } from "../models/Concept";

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
}