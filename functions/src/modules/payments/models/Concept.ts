import mongoose, { Document, Schema } from 'mongoose'

export interface IConcept extends Document {
    name: string
    description: string
    creation_date: Date
    priority: Number
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
    priority: {
        type: Number,
        default: 1
    }
})

export default mongoose.model<IConcept>('Concept', ConceptSchema)