import mongoose, { Document, Schema, Types } from "mongoose"
import CashFlow from "../../cashFlow/model/CashFlow"

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
        type: String,
        enum: ['income', 'expense'],
        default: 'income'
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
})

PaymentSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate() as { amount?: number }
        if (!update.amount) {
            return next()
        }

        const oldPayment = await this.model.findOne(this.getQuery()).exec()
        if (!oldPayment) return next()

        const amountDifference = update.amount - oldPayment.amount
        const updateField = oldPayment.type === 'income' ? 'total_income' : 'total_expense';

        // Actualizar cash_flow_by_month
        await CashFlow.findOneAndUpdate(
            { year: oldPayment.year, month: oldPayment.month, box: oldPayment.box },
            {
                $inc: {
                    [updateField]: amountDifference,
                    total_balance: amountDifference * (oldPayment.type === 'income' ? 1 : -1),
                },
            }
        );

        next()
    } catch (error) {
        console.error('Error en middleware de Payment:', error);
        next(error as mongoose.CallbackError)
    }
})

export default mongoose.model<IPayment>('Payment', PaymentSchema)