import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    username: string;
    name: string;
    password: string;
    date: Date;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    date: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export default mongoose.model<IUser>('User', UserSchema)