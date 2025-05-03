import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { ReceiptService } from "../services/ReceiptServivice"

const receiptService = new ReceiptService()

export class ReceiptController {

    async getAllReceipts(req: Request, res: Response): Promise<void> {
        try {
            const receipts = await receiptService.getAll()
            responses.success(req, res, receipts)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateReceiptSequence(req: Request, res: Response): Promise<void> {
        try {
            const { name, seq } = req.body
            const updatedSeq = await receiptService.updateSequence(name, seq)
            responses.success(req, res, updatedSeq)
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}