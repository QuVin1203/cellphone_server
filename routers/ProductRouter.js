import express from 'express'
import {getAllProduct, filterProductByType, findProductById, AddProduct, DeleteProduct, UpdateProduct, SearchProduct, paginationProduct} from '../controllers/ProductController.js'
import {isAuth, isAdmin} from '../untils/until.js'
const ProductRouter = express.Router()

ProductRouter.get('/:type', filterProductByType)
ProductRouter.get('/detail/:id', findProductById)
ProductRouter.get('/', getAllProduct)
ProductRouter.get(`/pagination/:page`, paginationProduct)

ProductRouter.post('/create',isAuth, isAdmin, AddProduct)
ProductRouter.put('/update/:id', isAuth, isAdmin, UpdateProduct)
ProductRouter.delete('/delete/:id', isAuth, isAdmin, DeleteProduct)

ProductRouter.get('/search/product', SearchProduct)

export default ProductRouter