import Box, { IBox } from "../models/Box";

export class BoxService {
    async getAllBoxes(): Promise<IBox[]> {
        return await Box.find()
    }

    async getBoxById(id: string): Promise<IBox | null> {
        return await Box.findById(id)
    }

    async createBox(boxData: Partial<IBox>): Promise<IBox> {
        const box = new Box(boxData)
        return await box.save()
    }

    async updateBox(id: string, updatedData: Partial<IBox>): Promise<IBox | null> {
        return await Box.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteBox(id: string): Promise<object> {
        const result = await Box.findByIdAndDelete(id)
        return { deleted: result !== null }
    }
}