import * as dotenv from 'dotenv'
dotenv.config()

export const SECRET_KEY = process.env.JWT_SECRET || 'payments-12587-my-secret-akptuf'
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/free-lunch-day'