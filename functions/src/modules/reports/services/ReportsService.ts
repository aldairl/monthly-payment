import PaymentConcept from "../../payments/models/PaymentConcepts"

export class ReportsService {
    async getPaidBeneficiariesByMonth(year: string, month: string) {
        const paidConcepts = await PaymentConcept.find({ year, month })
            .populate({
                path: 'payment_id',
                populate: {
                    path: 'payer',
                    select: 'name lastname identification temple cellphone'
                }
            })
            .exec()

        // Extract unique beneficiaries
        const beneficiariesMap = new Map()

        paidConcepts.forEach((concept: any) => {
            const payment = concept.payment_id
            if (payment && payment.payer) {
                const beneficiary = payment.payer
                beneficiariesMap.set(beneficiary._id.toString(), beneficiary)
            }
        })

        return Array.from(beneficiariesMap.values())
    }
}
