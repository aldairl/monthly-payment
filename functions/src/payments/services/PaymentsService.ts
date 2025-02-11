import Payment, { IPayment } from "../models/Payments"

export class PaymentService {
    async getAllPayments(): Promise<IPayment[]> {
        return await Payment.find()
    }

    async getPaymentById(id: string): Promise<IPayment | null> {
        return await Payment.findById(id)
    }

    async createPayment(PaymentData: Partial<IPayment>): Promise<IPayment> {
        const payment = new Payment(PaymentData)
        return await payment.save()
    }

    async updatePayment(id: string, updatedData: Partial<IPayment>): Promise<IPayment | null> {
        return await Payment.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deletePayment(id: string): Promise<object> {
        const result = await Payment.findByIdAndDelete(id)
        return { deleted: result !== null }
    }
}