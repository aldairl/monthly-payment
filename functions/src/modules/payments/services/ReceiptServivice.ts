import { IReceipt, Receipt } from '../models/ReceiptModel'


export class ReceiptService {

    async getAll(): Promise<IReceipt[]> {
        return await Receipt.find({})
    }

    async getNextSequence(name: string): Promise<number> {
        const updated = await Receipt.findByIdAndUpdate(
            name,
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        return updated.seq;
    }

    async updateSequence(name: string, seq: number): Promise<number> {
        const updated = await Receipt.findByIdAndUpdate(
            name,
            { seq: seq },
            { new: true, upsert: true }
        )
        return updated.seq
    }
}