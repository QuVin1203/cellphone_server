import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    salePrice: {type: Number, required: true},
    type: {type: String, required: true},
    image: {type: String}
},{
    timestamps: true,
  },
);
Product.index({name: 'text'});
export const ProductModel = mongoose.model("Product", Product)