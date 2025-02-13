import mongoose, { Document, Schema } from 'mongoose'

export interface IYear extends Document {
    year: number
    description: string
    creation_date: Date
}

const YearSchema: Schema<IYear> = new Schema({
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model<IYear>('Year', YearSchema)
