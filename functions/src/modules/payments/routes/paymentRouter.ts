import { Router } from "express"
import { PaymentController } from '../controller/PaymentsController'
import { authenticateJWT } from "../../../common/middlewares/Auth"

const paymentController = new PaymentController()
const paymentsRouter = Router()

paymentsRouter.get('/', authenticateJWT, paymentController.getAllPaymentes)
paymentsRouter.get("/:id", authenticateJWT, paymentController.getPaymentById)
paymentsRouter.post("/", authenticateJWT, paymentController.createPayment)
paymentsRouter.put("/:id", authenticateJWT, paymentController.updatePayment)
paymentsRouter.delete("/:id", authenticateJWT, paymentController.deletePayment)
paymentsRouter.get("/last/:cc", paymentController.getLastBeneficiaryPayment)

export default paymentsRouter