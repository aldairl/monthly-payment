import express from 'express'
import { https } from 'firebase-functions'
import cors from "cors"
import authRouter from './auth/routes/authRouter'
import connectDatabase from './config/database'

connectDatabase()

const app = express()
app.use(cors({}))
app.use(express.json())


app.use("/auth", authRouter)

export const api = https.onRequest(app)