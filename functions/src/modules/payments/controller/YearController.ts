import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { AuthRequest } from "../../../common/interfaces/authRequest"
import { YearService } from "../services/YearService"

const yearService = new YearService()

export class YearController {
    async getAllYears(req: Request, res: Response): Promise<void> {
        try {
            const Years = await yearService.getAlYears()
            responses.success(req, res, Years)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createYear(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { year, description } = req.body

            const newYear = await yearService.createYear({ year, description })
            responses.success(req, res, newYear)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateYear(req: Request, res: Response): Promise<void> {
        try {
            const { year, description } = req.body
            const updatedYear = await yearService.updateYear(req.params.id, { year, description })

            if (updatedYear) {
                responses.success(req, res, updatedYear)
            } else {
                responses.error(req, res, { message: "Year not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deleteYear(req: Request, res: Response): Promise<void> {
        try {
            const success = await yearService.deleteYear(req.params.id)
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Year not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}