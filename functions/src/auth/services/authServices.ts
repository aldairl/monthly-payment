import { SECRET_KEY } from "../../config/variables"
import UserModel, { IUser } from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (username: string, password: string): Promise<{ token: string, username: string, name: string } | Error> => {
    const user = await UserModel.findOne({
        username: username
    }).exec()

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid credentials')
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' })
    return { token, username, name: user.name }
}

export const create = async (data: Partial<IUser>): Promise<IUser> => {
    const user = new UserModel(data)
    return await user.save()
}
