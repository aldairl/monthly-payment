import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IPaymentConcept extends Document {
    concept_id: Types.ObjectId
    payment_id: Types.ObjectId
    month: string
    amount: number
    creation_date: Date
}

const PaymentConceptSchema: Schema<IPaymentConcept> = new Schema({
    concept_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Concept'
    },
    payment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Payment'
    },
    month: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IPaymentConcept>('PaymentConcept', PaymentConceptSchema)