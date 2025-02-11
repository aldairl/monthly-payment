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

    async createPayment(paymentData: Partial<IPayment>): Promise<IPayment> {
        const receipt = await this.generateReceipt()
        paymentData.receipt = receipt

        const payment = new Payment(paymentData)
        const paymentSaved = await payment.save()
        // update cash flow
        await cashFlowService.updateCashFlow(paymentSaved.box, Number(payment.amount), paymentSaved.type)
        return paymentSaved
    }

    async updatePayment(id: string, updatedData: Partial<IPayment>): Promise<IPayment | null> {
        const updated = await Payment.findByIdAndUpdate(id, updatedData, { new: true })

        return updated
    }

    async deletePayment(id: string): Promise<object> {
        const result = await Payment.findByIdAndDelete(id)
        if (!result) {
            return { deleted: false }
        }
        // updated cash flow
        await cashFlowService.updateCashFlow(result.box, -Number(result.amount), result.type)
        return { deleted: true }
    }

    async generateReceipt() {
        // TODO
        const date = new Date().getTime()
        return `A-${date}`
    }
}