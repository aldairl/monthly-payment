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
        ref: 'Beneficiary',
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
        const update = this.getUpdate() as { amount?: number, type?: string }
        if (!update.amount) {
            return next()
        }

        const oldPayment = await this.model.findOne(this.getQuery()).exec()
        if (!oldPayment) return next()

        const newType = update.type ?? oldPayment.type;
        const amountDifference = update.amount - oldPayment.amount

        let incomeChange = 0;
        let expenseChange = 0;
        let balanceChange = 0;

        if (oldPayment.type === newType) {
            // Solo cambió el monto
            if (newType === 'income') {
                incomeChange = amountDifference;
                balanceChange = amountDifference;
            } else {
                expenseChange = amountDifference;
                balanceChange = -amountDifference;
            }
        } else {
            // Cambió el tipo (income <-> expense)
            if (oldPayment.type === 'income' && newType === 'expense') {
                incomeChange = -oldPayment.amount;
                expenseChange = update.amount;
                balanceChange = -oldPayment.amount - update.amount;
            } else if (oldPayment.type === 'expense' && newType === 'income') {
                expenseChange = -oldPayment.amount;
                incomeChange = update.amount;
                balanceChange = oldPayment.amount + update.amount;
            }
        }

        console.log({ incomeChange, expenseChange, balanceChange });

        await CashFlow.findOneAndUpdate(
            { box: oldPayment.box },
            {
                $inc: {
                    total_income: incomeChange,
                    total_expense: expenseChange,
                    total_balance: balanceChange,
                },
            }
        );

        next()
    } catch (error) {
        console.error('Error en middleware de Payment:', error);
        next(error as mongoose.CallbackError)
    }
})

// Virtual para traer los conceptos asociados a un pago
PaymentSchema.virtual('concepts', {
    ref: 'PaymentConcept', // Nombre del modelo a poblar
    localField: '_id',     // Campo en Payment
    foreignField: 'payment_id', // Campo en ConceptPayment
})

PaymentSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await mongoose.model('PaymentConcept').deleteMany({ payment_id: this._id }).exec()
        next()
    } catch (error) {
        next(error as mongoose.CallbackError)
    }
})

export default mongoose.model<IPayment>('Payment', PaymentSchema)