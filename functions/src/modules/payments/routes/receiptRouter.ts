import { Router } from "express"
import { ReceiptController } from '../controller/ReceiptController'
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"

const receiptController = new ReceiptController()
const receiptRouter = Router()

receiptRouter.get('/', authenticateJWT, receiptController.getAllReceipts)
receiptRouter.put('/sequence', authenticateJWT, checkIsAdmin, receiptController.updateReceiptSequence)
