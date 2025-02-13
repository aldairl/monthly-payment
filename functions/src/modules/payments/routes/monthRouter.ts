import { Router } from "express"
import { authenticateJWT } from "../../../common/middlewares/Auth"
import { MonthController } from "../controller/MonthController"

const monthController = new MonthController()
const monthRouter = Router()

monthRouter.get('/:year', authenticateJWT, monthController.getAllMonths)
monthRouter.post("/", authenticateJWT, monthController.createMonth)
monthRouter.put("/:id", authenticateJWT, monthController.updateMonth)
monthRouter.delete("/:id", authenticateJWT, monthController.deleteMonth)

export default monthRouter