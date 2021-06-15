import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true},
        qty: { type: String, required: true},
        image: { type: String, required: true},
        price: { type: String, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    shippingAddress: {type: String, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
    timestamps: true,
}
)

export const OrderModel = mongoose.model('Order', orderSchema);
