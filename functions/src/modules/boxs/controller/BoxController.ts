import { Request, Response } from "express"
import { BoxService } from "../services/BoxService"
import { responses } from "../../../common/classes/Response";

const boxService = new BoxService()

export class BoxController {
    async getAllBoxes(req: Request, res: Response): Promise<void> {
        try {
            const boxes = await boxService.getAllBoxes();
            responses.success(req, res, boxes)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async getBoxById(req: Request, res: Response): Promise<void> {
        try {
            const box = await boxService.getBoxById(req.params.id);
            if (box) {
                responses.success(req, res, box)
            } else {
                responses.error(req, res, { message: "Box not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createBox(req: Request, res: Response): Promise<void> {
        try {
            const { name, status, description } = req.body
            const newBox = await boxService.createBox({ name, status, description })
            responses.success(req, res, newBox)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateBox(req: Request, res: Response): Promise<void> {
        try {
            const { name, status, description, close_date } = req.body
            const updatedBox = await boxService.updateBox(req.params.id, { name, status, description, close_date })

            if (updatedBox) {
                responses.success(req, res, updatedBox)
            } else {
                responses.error(req, res, { message: "Box not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deleteBox(req: Request, res: Response): Promise<void> {
        try {
            const success = await boxService.deleteBox(req.params.id);
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Box not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}