import express from 'express'
import { https } from 'firebase-functions'
import cors from "cors"
import connectDatabase from './config/database'
import authRouter from './modules/auth/routes/authRouter'
import boxRouter from './modules/boxs/routes/BoxRouter'
import paymentsRouter from './modules/payments/routes/paymentRouter'
import expensesRouter from './modules/payments/routes/expenseRouter'
import conceptsRouter from './modules/payments/routes/conceptRouter'

connectDatabase()

const app = express()
app.use(cors({}))
app.use(express.json())

app.use("/auth", authRouter)
app.use("/box", boxRouter)
app.use("/payments", paymentsRouter)
app.use("/expenses", expensesRouter)
app.use("/concepts", conceptsRouter)

export const api = https.onRequest(app)