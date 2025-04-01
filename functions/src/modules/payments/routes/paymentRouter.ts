import { Router } from "express"
import { PaymentController } from '../controller/PaymentsController'
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"

const paymentController = new PaymentController()
const paymentsRouter = Router()

paymentsRouter.get('/', authenticateJWT, paymentController.getAllPaymentes)
paymentsRouter.get("/:id", authenticateJWT, paymentController.getPaymentById)
paymentsRouter.post("/", authenticateJWT, checkIsAdmin, paymentController.createPayment)
paymentsRouter.put("/:id", authenticateJWT, checkIsAdmin, paymentController.updatePayment)
paymentsRouter.delete("/:id", authenticateJWT, checkIsAdmin, paymentController.deletePayment)
paymentsRouter.get("/last/:cc", authenticateJWT, paymentController.getLastBeneficiaryPayment)

export default paymentsRouter