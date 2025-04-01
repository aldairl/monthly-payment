import { Router } from "express";
import { createUserController, healthController, loginController, updateUserController } from "../controllers/authController";
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth";

const authRouter = Router()

authRouter.get('/', healthController)
authRouter.post('/login', loginController)
authRouter.post('/create', authenticateJWT, checkIsAdmin, createUserController)
authRouter.put('/:id', authenticateJWT, updateUserController)

export default authRouter