import Month, { IMonth } from "../models/Month";

export class MonthService {
    async getAllMonthByYear(year: number ): Promise<IMonth[]> {
        return await Month.find({ year })
    }

    async createMonth(monthData: Partial<IMonth>) {
        const monthSaved = new Month(monthData)
        return await monthSaved.save()
    }

    async updateMonth(id: string, updatedData: Partial<IMonth>): Promise<IMonth | null> {
        return await Month.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteMonth(id: string): Promise<IMonth> {
        const result = await Month.findByIdAndDelete(id)
        if (!result) {
            throw new Error('Can not delete the Month')
        }
        return result
    }
}