import { Router } from "express"
import { BoxController } from "../controller/boxController"
import { authenticateJWT } from "../../common/middlewares/Auth"

const boxRouter = Router()
const boxController = new BoxController()

boxRouter.get("/", authenticateJWT, boxController.getAllBoxes)
boxRouter.get("/:id", authenticateJWT, boxController.getBoxById)
boxRouter.post("/", authenticateJWT, boxController.createBox)
boxRouter.put("/:id", authenticateJWT, boxController.updateBox)
boxRouter.delete("/:id", authenticateJWT, boxController.deleteBox)

export default boxRouter