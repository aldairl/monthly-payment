import { Request, Response } from "express"
import { PaymentConceptService } from '../services/PaymentConcepts'
import { responses } from "../../../common/classes/Response"

const paymentConceptsService = new PaymentConceptService()

export class PaymentConceptsController {
    async deletePaymentConcept(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const success = await paymentConceptsService.deletePaymentConceptById(id)

            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Concept not found" })
            }

        } catch (error) {
            responses.error(req, res, error)
        }
    }
}