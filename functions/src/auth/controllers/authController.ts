import { Request, Response } from "express"
import { responses } from "../../common/classes/Response"
import * as authService from '../services/authServices'
import { APP_NAME } from "../../config/variables"

export const loginController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const token = await authService.login(username, password)
        responses.success(req, res, token)
    } catch (error) {
        responses.error(req, res, error, 401)
    }
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { username, password, name } = req.body
        const data = {
            username,
            password,
            name
        }
        const token = await authService.create(data)
        responses.success(req, res, token, 201)
    } catch (error) {
        responses.error(req, res, error)
    }
}

export const healthController = async (req: Request, res: Response) => {
    try {
        responses.success(req, res, {status: 'up', appName: APP_NAME})
    } catch (error) {
        responses.error(req, res, error)
    }
}