import { Router } from "express";
import { createUserController, healthController, loginController } from "../controllers/authController";
import { authenticateJWT } from "../../common/middlewares/Auth";

const authRouter = Router()

authRouter.get('/', healthController)
authRouter.post('/login', loginController)
authRouter.post('/create', authenticateJWT, createUserController)

export default authRouter