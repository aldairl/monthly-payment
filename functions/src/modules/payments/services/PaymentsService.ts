import mongoose from "mongoose"
import { CashFlowService } from "../../cashFlow/service/CashFlowService"
import Payment, { IPayment } from "../models/Payments"
import { IConcept } from "../models/Concept"

const cashFlowService = new CashFlowService()

export class PaymentService {
    async getAllPayments(query: object): Promise<IPayment[]> {
        return await Payment.find(query)
    }

    async getPaymentById(id: string): Promise<IPayment | null> {
        return await Payment.findById(id)
    }

    async createPayment(paymentData: Partial<IPayment>, session: mongoose.ClientSession): Promise<IPayment> {
        const receipt = await this.generateReceipt()
        paymentData.receipt = receipt

        // const paymentSaved = new Payment(paymentData)
        // const paymentSaved = await payment.save({ session })
        const paymentSaved = await Payment.create([{ ...paymentData }], { session })
        return paymentSaved[0]
    }

    async updatePayment(id: string, updatedData: Partial<IPayment>): Promise<IPayment | null> {
        const updated = await Payment.findByIdAndUpdate(id, updatedData, { new: true })

        return updated
    }

    async deletePayment(id: string, session: mongoose.ClientSession): Promise<IPayment> {
        const result = await Payment.findByIdAndDelete(id).session(session)
        if (!result) {
            throw new Error('Can not delete the document')
        }
        return result
    }

    async generateReceipt() {
        // TODO
        const date = new Date().getTime()
        return `A-${date}`
    }

    async deletePaymentTransaction(id: string): Promise<{ deleted: boolean }> {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const result = await this.deletePayment(id, session)
            await cashFlowService.updateCashFlow(result.box, -Number(result.amount), result.type, session)

            // confirm transaction
            await session.commitTransaction()
            session.endSession()
            return { deleted: true }
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            return { deleted: false }
        }
    }

    async createPaymentTransaction(paymentData: Partial<IPayment>, concepts: Partial<IConcept[]>) {
        // start transaction
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const paymentSaved = await this.createPayment(paymentData, session)
            await cashFlowService.updateCashFlow(paymentSaved.box, Number(paymentSaved.amount), paymentSaved.type, session)
            //TODO create concepts

            await session.commitTransaction()
            session.endSession()
            return paymentSaved
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }
}