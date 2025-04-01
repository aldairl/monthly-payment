import { Router } from "express"
import { BoxController } from "../controller/BoxController"
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"

const boxRouter = Router()
const boxController = new BoxController()

boxRouter.get("/", authenticateJWT, boxController.getAllBoxes)
boxRouter.get("/:id", authenticateJWT, boxController.getBoxById)
boxRouter.post("/", authenticateJWT, checkIsAdmin ,boxController.createBox)
boxRouter.put("/:id", authenticateJWT, checkIsAdmin ,boxController.updateBox)
boxRouter.delete("/:id", authenticateJWT, checkIsAdmin ,boxController.deleteBox)
boxRouter.get("/details/:id", authenticateJWT, boxController.getBoxDetails)
boxRouter.get("/balance/:id", authenticateJWT, boxController.getBoxBalance)

export default boxRouter