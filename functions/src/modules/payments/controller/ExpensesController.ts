import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { AuthRequest } from "../../../common/interfaces/authRequest"
import { PaymentService } from "../services/PaymentsService"


const paymentService = new PaymentService()

export class ExpenseController {

    async getAllExpenses(req: Request, res: Response): Promise<void> {
        try {
            const expenses = await paymentService.getAllPayments({ type: 'expense' })
            responses.success(req, res, expenses)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createExpense(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { amount, box, payer, concepts } = req.body
            const createdBy = req.user.id
            const newPayment = await paymentService.createPaymentTransaction({ amount, box, payer, createdBy, type: 'expense' }, concepts)
            responses.success(req, res, newPayment)
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}