import { Schema, model } from 'mongoose'

export interface IReceipt {
    _id: string;
    seq: number;
}

const receiptSchema = new Schema<IReceipt>({
    _id: { type: String, required: true }, // e.g., "receipt"
    seq: { type: Number, default: 346 },
})

export const Receipt = model<IReceipt>('Receipt', receiptSchema)