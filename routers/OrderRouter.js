import express from 'express'
import {createOrder, GetAllOrder,DeleteOrder} from '../controllers/OrderController.js'
import {isAuth, isAdmin} from '../untils/until.js'

const OrderRouter = express.Router()

OrderRouter.post('/create', createOrder)
OrderRouter.get('/', GetAllOrder)
OrderRouter.delete('/delete/:id', DeleteOrder)

export default OrderRouter