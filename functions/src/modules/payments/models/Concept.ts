import mongoose, { Document, Schema } from 'mongoose'

export interface IConcept extends Document {
    name: string
    description: string
    creation_date: Date
}

const ConceptSchema: Schema<IConcept> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model<IConcept>('Concept', ConceptSchema)