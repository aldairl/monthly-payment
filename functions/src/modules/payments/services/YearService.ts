import Year, { IYear } from "../models/Year";

export class YearService {
    async getAlYears( ): Promise<IYear[]> {
        return await Year.find()
    }

    async createYear(yearData: Partial<IYear>) {
        const newYear = new Year(yearData)
        return await newYear.save()
    }

    async updateYear(id: string, updatedData: Partial<IYear>): Promise<IYear | null> {
        return await Year.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteYear(id: string): Promise<IYear> {
        const result = await Year.findByIdAndDelete(id)
        if (!result) {
            throw new Error('Can not delete the Year')
        }
        return result
    }
}