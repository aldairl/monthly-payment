import { SECRET_KEY } from "../../../config/variables"
import UserModel, { IUser } from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (username: string, password: string): Promise<{ token: string, username: string, name: string, role: any } | Error> => {
    const user = await UserModel.findOne({
        username: username
    }).populate({
        path: 'role',
        select: 'name',
        transform: (doc) => {
            return doc.name;
        }
    })

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid credentials')
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' })
    return { token, username, name: user.name, role: user.role }
}

export const create = async (data: Partial<IUser>): Promise<IUser> => {
    const user = new UserModel(data)
    return await user.save()
}

export const updateUser = async (id: string, updatedData: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, updatedData, { new: true })
}
