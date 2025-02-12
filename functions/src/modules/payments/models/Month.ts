import mongoose, { Document, Schema } from 'mongoose'

export interface IMonth extends Document {
    name: string
    year: number
    month: number
    description: string
    creation_date: Date
}

const MonthSchema: Schema<IMonth> = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
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

export default mongoose.model<IMonth>('Month', MonthSchema)
