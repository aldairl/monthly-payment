import { Router } from "express"
import { ReportsController } from "../controller/ReportsController"
import { authenticateJWT } from "../../../common/middlewares/Auth"

const reportsRouter = Router()
const reportsController = new ReportsController()

reportsRouter.get('/paid-users', authenticateJWT, reportsController.getPaidUsersByMonth)

export default reportsRouter
