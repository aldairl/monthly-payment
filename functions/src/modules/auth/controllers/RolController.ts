import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { RolService } from '../services/RolService'

const rolService = new RolService()

export class RolController {

    async createRol(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body
            const newRol = await rolService.createRol({ name })
            responses.success(req, res, newRol)
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}