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
    status: { type: String, enum: ['open', 'close'], default: 'open' },
    description: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    close_date: { type: Date, required: false },
})

BoxSchema.pre('findOneAndDelete', async function (next) {
    try {


        const boxId = this.getQuery()._id
        console.log('Deleting box:', boxId)

        // Delete beneficiay to box
        await mongoose.model('Beneficiary').findOneAndDelete({ identification: boxId })

        await mongoose.model('Payment').deleteMany({ box: boxId })

        // delete cash flow
        await mongoose.model('CashFlow').deleteOne({ box: boxId })

        next()
    } catch (error) {
        next(error as mongoose.CallbackError)
    }
})

BoxSchema.post('save', async function (doc) {
    try {
        await mongoose.model('CashFlow').create({
            box: doc._id,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        })

        // Create a beneficiay to box
        await mongoose.model('Beneficiary').create({
            name: doc.name,
            identification: doc._id,
        })

    } catch (error) {
        console.error('Error al crear cash flow:', error)
    }
})

export default mongoose.model<IBox>("Box", BoxSchema);
