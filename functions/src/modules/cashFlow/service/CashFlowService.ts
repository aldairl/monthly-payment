import mongoose, { Types } from "mongoose";
import CashFlow from "../model/CashFlow";

export class CashFlowService {

    async updateCashFlow(boxId: Types.ObjectId | string,  amount: number, type: 'income' | 'expense', session: mongoose.ClientSession): Promise<void> {
        const updateField = type === 'income' ? 'total_income' : 'total_expense';
        const balanceChange = type === 'income' ? amount : -amount;

        try {

            console.log(`Actualizando cash flow para ${boxId}-${amount}-${type}`)

            const cashSaved = await CashFlow.findOneAndUpdate(
                { box: boxId },
                {
                    $inc: { [updateField]: amount, total_balance: balanceChange },
                },
                { upsert: true, new: true, session }
            )

            console.log(`Cash flow actualizado para ${cashSaved}-${cashSaved.month}`)
        } catch (error) {
            console.error('Error actualizando cash flow:', error)
        }
    }
}