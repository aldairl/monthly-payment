import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { AuthRequest } from "../../../common/interfaces/authRequest"
import { MonthService } from "../services/MonthService"

const monthService = new MonthService()

export class MonthController {
    async getAllMonths(req: Request, res: Response): Promise<void> {
        try {
            const { year } = req.params
            const Months = await monthService.getAllMonthByYear(Number(year))
            responses.success(req, res, Months)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createMonth(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { name, year, month, description } = req.body

            const newMonth = await monthService.createMonth({ name, year, month, description })
            responses.success(req, res, newMonth)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateMonth(req: Request, res: Response): Promise<void> {
        try {
            const { name, year, month, description } = req.body
            const updatedMonth = await monthService.updateMonth(req.params.id, { name, year, month, description })

            if (updatedMonth) {
                responses.success(req, res, updatedMonth)
            } else {
                responses.error(req, res, { message: "Month not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deleteMonth(req: Request, res: Response): Promise<void> {
        try {
            const success = await monthService.deleteMonth(req.params.id)
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Month not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}