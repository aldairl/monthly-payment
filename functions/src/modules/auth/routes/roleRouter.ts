import { Router } from "express";
import { RolController } from "../controllers/RolController";
import { authenticateJWT } from "../../../common/middlewares/Auth";

const rolController = new RolController()
const roleRouter = Router()

roleRouter.post('/', authenticateJWT, rolController.createRol)

export default roleRouter