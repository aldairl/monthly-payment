import { Request, Response } from "express"
import { PaymentService } from "../services/PaymentsService"
import { responses } from "../../../common/classes/Response"
import { AuthRequest } from "../../../common/interfaces/authRequest"

const paymentService = new PaymentService()

export class PaymentController {
    async getAllPaymentes(req: Request, res: Response): Promise<void> {
        try {
            const Paymentes = await paymentService.getAllPayments()
            responses.success(req, res, Paymentes)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async getPaymentById(req: Request, res: Response): Promise<void> {
        try {
            const Payment = await paymentService.getPaymentById(req.params.id)
            if (Payment) {
                responses.success(req, res, Payment)
            } else {
                responses.error(req, res, { message: "Payment not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createPayment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { amount, box, payer } = req.body
            const createdBy = req.user.id

            const newPayment = await paymentService.createPayment({ amount, box, payer, createdBy, type: 'income' })
            responses.success(req, res, newPayment)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createExpense(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { amount, box, payer } = req.body
            const createdBy = req.user.id
            const newPayment = await paymentService.createPayment({ amount, box, payer, createdBy, type: 'expense' })
            responses.success(req, res, newPayment)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updatePayment(req: Request, res: Response): Promise<void> {
        try {
            const { amount, box, payer } = req.body
            const updatedPayment = await paymentService.updatePayment(req.params.id, { amount, box, payer })

            if (updatedPayment) {
                responses.success(req, res, updatedPayment)
            } else {
                responses.error(req, res, { message: "Payment not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deletePayment(req: Request, res: Response): Promise<void> {
        try {
            const success = await paymentService.deletePayment(req.params.id)
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Payment not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}