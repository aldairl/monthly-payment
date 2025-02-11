import express from 'express'
import { https } from 'firebase-functions'
import cors from "cors"
import connectDatabase from './config/database'
import authRouter from './modules/auth/routes/authRouter'
import boxRouter from './modules/boxs/routes/BoxRouter'
import paymentsRouter from './modules/payments/routes/paymentRouter'

connectDatabase()

const app = express()
app.use(cors({}))
app.use(express.json())

app.use("/auth", authRouter)
app.use("/boxes", boxRouter)
app.use("/payments", paymentsRouter)

export const api = https.onRequest(app)