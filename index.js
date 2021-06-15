import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db/db.js'
import ProductRouter from './routers/ProductRouter.js'
import UserRouter from './routers/UserRouter.js'
import OrderRouter from './routers/OrderRouter.js'

dotenv.config();
process.env.TOKEN_SECRET;

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: '30mb'}))

app.use('/products', ProductRouter)
app.use('/user', UserRouter)
app.use('/order', OrderRouter)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))