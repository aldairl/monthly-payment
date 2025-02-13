import { Router } from "express"
import { authenticateJWT } from "../../../common/middlewares/Auth"
import { YearController } from "../controller/YearController"

const yearController = new YearController()
const yearRouter = Router()

yearRouter.get('/', authenticateJWT, yearController.getAllYears)
yearRouter.post("/", authenticateJWT, yearController.createYear)
yearRouter.put("/:id", authenticateJWT, yearController.updateYear)
yearRouter.delete("/:id", authenticateJWT, yearController.deleteYear)

export default yearRouter