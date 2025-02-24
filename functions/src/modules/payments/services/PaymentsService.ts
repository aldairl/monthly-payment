import mongoose from "mongoose"
import { CashFlowService } from "../../cashFlow/service/CashFlowService"
import Payment, { IPayment } from "../models/Payments"
import { ConceptService } from "./ConceptService"
import { IPaymentConcept } from "../models/PaymentConcepts"
import { BeneficiaryService } from "../../beneficiaries/services/BeneficiaryService";

const cashFlowService = new CashFlowService()
const conceptService = new ConceptService()

const beneficiaryService = new BeneficiaryService()

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
            // Detele payment
            const result = await this.deletePayment(id, session)

            // delete payment concepts
            await conceptService.deletePaymentConcepts(result.id, session)

            // Update cash flow
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

    async createPaymentTransaction(paymentData: Partial<IPayment>, concepts: Partial<IPaymentConcept[]>) {
        // start transaction
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const paymentSaved = await this.createPayment(paymentData, session)
            await cashFlowService.updateCashFlow(paymentSaved.box, Number(paymentSaved.amount), paymentSaved.type, session)

            await conceptService.createPaymentConcepts(paymentSaved.id, concepts, session)

            await session.commitTransaction()
            session.endSession()
            return paymentSaved
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }

    async getLastBeneficiaryPayment(cc: string): Promise<IPayment | null> {
        // seaech beneficiary
        const beneficiary = await beneficiaryService.getBeneficiaryByDNI(cc)

        if(!beneficiary){
            return null
        }

        const lastPayment = await Payment.findOne({ payer: beneficiary })
            .sort({ creation_date: -1 }) // Ordenar por fecha descendente
            .populate('concepts')
            .populate('box')
            .populate('payer')
            .exec()

        return lastPayment
    }
}