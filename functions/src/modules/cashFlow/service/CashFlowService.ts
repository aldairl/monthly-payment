import { Types } from "mongoose";
import CashFlow from "../model/CashFlow";

export class CashFlowService {

    async updateCashFlow(boxId: Types.ObjectId | string,  amount: number, type: 'income' | 'expense'): Promise<void> {
        const updateField = type === 'income' ? 'total_income' : 'total_expense';
        const balanceChange = type === 'income' ? amount : -amount;

        try {
            const cashSaved = await CashFlow.findByIdAndUpdate(
                boxId,
                {
                    $inc: { [updateField]: amount, total_balance: balanceChange },
                },
                { upsert: true, new: true }
            )

            console.log(`Cash flow actualizado para ${cashSaved.year}-${cashSaved.month}`)
        } catch (error) {
            console.error('Error actualizando cash flow:', error)
        }
    }
}