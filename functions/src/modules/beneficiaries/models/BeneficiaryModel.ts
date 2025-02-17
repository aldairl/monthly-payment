import mongoose, { Schema, Document } from 'mongoose'

export interface IBeneficiary extends Document {
    name: string
    lastname: string
    identification: string
    birthdate: Date
    temple: string
    cellphone: string
    creation_date: Date
}

const BeneficiarySchema = new Schema<IBeneficiary>({
    name: { type: String, required: true },
    lastname: { type: String },
    identification: { type: String, required: true, unique: true },
    birthdate: { type: Date },
    temple: { type: String },
    cellphone: { type: String },
    creation_date: { type: Date, default: Date.now }
})

export default mongoose.model<IBeneficiary>('Beneficiary', BeneficiarySchema)