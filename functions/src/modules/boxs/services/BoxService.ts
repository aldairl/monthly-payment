import Box, { IBox } from "../models/Box";

export class BoxService {
    async getAllBoxes(year: number): Promise<IBox[]> {
        let query = {}

        if (year) {
            // create a range 
            const initDate = new Date(`${year}-01-01`)
            const endDate = new Date(`${year + 1}-01-01`)

            query = { creation_date: { $gte: initDate, $lte: endDate } }
        }

        // return await Box.find(query)
        return await Box.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'cashflows',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cashflow'
                }
            },
            { $unwind: '$cashflow' },
        ])
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