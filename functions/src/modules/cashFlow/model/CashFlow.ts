import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ICashFlow extends Document {
    box: Types.ObjectId
    year: number
    month: number
    total_income: number
    total_expense: number
    total_balance: number
    created_at: Date
    updated_at: Date
}

const CashFlowSchema: Schema<ICashFlow> = new Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },
        box: {
            type: Schema.Types.ObjectId,
            ref: 'Box',
            required: true,
        },
        total_income: {
            type: Number,
            default: 0,
        },
        total_expense: {
            type: Number,
            default: 0,
        },
        total_balance: {
            type: Number,
            default: 0,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
);

export default mongoose.model<ICashFlow>('CashFlow', CashFlowSchema)