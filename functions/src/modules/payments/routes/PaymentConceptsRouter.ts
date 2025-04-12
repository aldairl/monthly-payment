import { Router } from "express"
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"

import { PaymentConceptsController } from '../controller/PaymentConceptsController'

const paymentConceptsController = new PaymentConceptsController()
const paymentConceptsRouter = Router()

paymentConceptsRouter.delete('/:id', authenticateJWT, checkIsAdmin, paymentConceptsController.deletePaymentConcept)

export default paymentConceptsRouter