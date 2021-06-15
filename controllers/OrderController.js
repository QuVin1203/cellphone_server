import {OrderModel} from '../models/OrderModel.js'
import {UserModel} from '../models/UserModel.js';
import {ProductModel} from '../models/ProductModel.js'
import expressAsyncHandler from 'express-async-handler';

export const createOrder = expressAsyncHandler(async (req, res) => {
    console.log(req.body.shippingAddress.address)
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'cart is emty'})
    }else{
        const order = new OrderModel({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress.address,
            totalPrice: req.body.totalPrice,
            user: req.body.user._id
        })

        const createOrder = await order.save();
        res.status(201).send({message: 'new order created', order: createOrder})
    }
})

export const GetAllOrder = expressAsyncHandler(async (req, res) => {
    const Order = await OrderModel.find({})
    if(Order){
        res.send(Order)
    }else{
        res.status(401).send({message: 'no order'})
    }
})

export const DeleteOrder = expressAsyncHandler(async (req, res) => {
    const deleteOrder = await OrderModel.findById(req.params.id)

    if(deleteOrder){
        await deleteOrder.remove()
        res.send({message: 'product deleted'})
    }else{
        res.send('error in delete order')
    }
})