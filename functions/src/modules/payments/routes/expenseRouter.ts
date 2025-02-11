import { Router } from "express"
import { PaymentController } from '../controller/PaymentsController'
import { authenticateJWT } from "../../../common/middlewares/Auth"


const paymentController = new PaymentController()
const expensesRouter = Router()

expensesRouter.post("/", authenticateJWT, paymentController.createExpense)

export default expensesRouter