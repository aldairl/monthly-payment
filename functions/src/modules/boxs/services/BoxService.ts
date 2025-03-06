import Box, { IBox } from "../models/Box";
import { PaymentService } from "../../payments/services/PaymentsService"

// const conceptService = new ConceptService()
const paymentService = new PaymentService()

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
                    foreignField: 'box',
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
        console.log('Deleting in service box:', id)
        
        const result = await Box.findOneAndDelete({_id: id})
        return { deleted: result !== null }
    }
    
    async getBoxpayemntDetails(id: string): Promise<IBox | null> {
        // return await conceptService.getTotalPaymentConceptsByBox(id)
        return await paymentService.getPaymentDetailsByBox(id)
    }
}