import mongoose, { Schema, Document } from "mongoose"

export interface IBox extends Document {
    name: string;
    status: 'open' | 'close';
    description: string;
    creation_date: Date;
    close_date: Date;
}

const BoxSchema: Schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['open', 'close'], default:'open' },
    description: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    close_date: { type: Date, required: false },
})

export default mongoose.model<IBox>("Box", BoxSchema);
