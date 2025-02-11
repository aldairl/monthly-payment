import { CashFlowService } from "../../cashFlow/service/CashFlowService"
import Payment, { IPayment } from "../models/Payments"

const cashFlowService = new CashFlowService()

export class PaymentService {
    async getAllPayments(): Promise<IPayment[]> {
        return await Payment.find()
    }

    async getPaymentById(id: string): Promise<IPayment | null> {
        return await Payment.findById(id)
    }

    async createPayment(PaymentData: Partial<IPayment>): Promise<IPayment> {
        const payment = new Payment(PaymentData)
        const paymentSaved = await payment.save()
        // update cash flow
        await cashFlowService.updateCashFlow(paymentSaved.box, Number(payment.amount), 'income')
        return paymentSaved
    }

    async updatePayment(id: string, updatedData: Partial<IPayment>): Promise<IPayment | null> {
        let updated = null

        // TODO update cash flow
        if (updatedData.amount) {
            updated = await Payment.findByIdAndUpdate(id, updatedData)

            if (!updated) {
                return null
            }
            // balance should substract ( currentAmount - newamount )
            const substractValue = Number(updated?.amount) - Number(updatedData.amount)
            await cashFlowService.updateCashFlow(updated.box, -substractValue, 'income')

            updated = await Payment.findById(id)
        } else {
            updated = await Payment.findByIdAndUpdate(id, updatedData, { new: true })
        }

        return updated
    }

    async deletePayment(id: string): Promise<object> {
        const result = await Payment.findByIdAndDelete(id)
        if (!result) {
            return { deleted: false }
        }
        // updated cash flow
        await cashFlowService.updateCashFlow(result.box, -Number(result.amount), 'income')
        return { deleted: true }
    }
}