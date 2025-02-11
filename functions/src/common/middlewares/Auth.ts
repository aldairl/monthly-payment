import { NextFunction, Response } from "express"
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config/variables"
import { responses } from "../classes/Response"
import { AuthRequest } from "../interfaces/authRequest"

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) throw new Error('Access denied')

        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        responses.error(req, res, error, 403)
    }
}