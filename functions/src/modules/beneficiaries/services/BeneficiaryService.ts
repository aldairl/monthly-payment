import BeneficiaryModel, { IBeneficiary } from "../models/BeneficiaryModel"


export class BeneficiaryService {
    async getAllBeneficiaries(): Promise<IBeneficiary[]> {
        return await BeneficiaryModel.find()
    }

    async getBeneficiaryById(id: string): Promise<IBeneficiary | null> {
        return await BeneficiaryModel.findById(id)
    }

    async getBeneficiaryByDNI(identification: string): Promise<IBeneficiary[] | null> {
        return await BeneficiaryModel.find({ identification })
    }

    async createBeneficiary(beneficiaryData: Partial<IBeneficiary>): Promise<IBeneficiary> {
        const beneficiary = new BeneficiaryModel(beneficiaryData)
        return await beneficiary.save()
    }

    async updateBeneficiary(id: string, updatedData: Partial<IBeneficiary>): Promise<IBeneficiary | null> {
        return await BeneficiaryModel.findByIdAndUpdate(id, updatedData, { new: true })
    }

    async deleteBeneficiary(id: string): Promise<object> {
        const result = await BeneficiaryModel.findByIdAndDelete(id)
        return { deleted: result !== null }
    }
}