import { Request, Response } from "express"
import { ReportsService } from "../services/ReportsService"
import { responses } from "../../../common/classes/Response"

const reportsService = new ReportsService()

export class ReportsController {
    async getPaidUsersByMonth(req: Request, res: Response): Promise<void> {
        try {
            const { year, month } = req.query

            if (!year || !month) {
                responses.error(req, res, { message: "Year and month are required" }, 400)
                return
            }

            const users = await reportsService.getPaidBeneficiariesByMonth(year as string, month as string)
            responses.success(req, res, users)
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}
