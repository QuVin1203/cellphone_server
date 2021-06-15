import {ProductModel} from '../models/ProductModel.js'
import expressAsyncHandler from 'express-async-handler'
import {data} from '../data.js'

export const getAllProduct = expressAsyncHandler(async (req, res) => {
    // await ProductModel.remove()
    // const product = await ProductModel.insertMany(data.products)
    ProductModel.find()
        .then(product => res.send(product))
        .catch(err => console.log(err))
})

export const findProductById = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    
    if(product){
        res.send(product)
    }
})

export const filterProductByType = (req, res) => {
    ProductModel.find({type: req.params.type})
        .then(product => res.send(product))
        .catch(err => console.log(err))
}

export const AddProduct = expressAsyncHandler(async (req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        salePrice: req.body.salePrice,
        type: req.body.type,
        image:req.body.image
    })

    const newProduct = await product.save()
    if(newProduct){
       return res
        .status(201)
        .send({ message: 'New Product Created', data: newProduct })
    }else{
        res.send("error add product")
    }
})

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        product.name = req.body.name
        product.price = req.body.price
        product.salePrice = req.body.salePrice
        product.type = req.body.type
        product.image = req.body.image

        const updateProduct = await product.save();
        if(updateProduct){
            res.send('update success')
        }
    }

    return res.send('update fail')
    
})

export const DeleteProduct = expressAsyncHandler(async (req, res) => {
    const deleteProduct = await ProductModel.findById(req.params.id)

    if(deleteProduct){
        await deleteProduct.remove()
        res.send({message: 'product deleted'})
    } else{
        res.send('error in deletetion')
    }
})

export const SearchProduct = expressAsyncHandler(async (req, res) => {
    const search = req.query.name
    const product = await ProductModel.find({name: {$regex: search, $options: '$i'}})
    
    product.length > 0 ? res.send(product) : res.send({message: ' khong tim thay sp'})
})

export const paginationProduct = expressAsyncHandler(async (req, res) => {
    var perPage = 4
    var page = req.params.page || 1

    ProductModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            ProductModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})


