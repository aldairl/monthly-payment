import mongoose, { Document, Schema, Types } from "mongoose"

export interface IPayment extends Document {
    payer: Types.ObjectId
    amount: Number
    box: Types.ObjectId
    receipt: String
    type: 'income' | 'expense'
    creation_date: Date
    createdBy: Types.ObjectId
}

const PaymentSchema: Schema<IPayment> = new Schema({
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    box: {
        type: Schema.Types.ObjectId,
        ref: 'Box',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    receipt: {
        type: String,
        required: true
    },
    type: {
        enum: ['income', 'expense'],
        required: false,
        default: 'income'
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IPayment>('Payment', PaymentSchema)