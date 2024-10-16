import express from "express";
import { upload } from "../config/cloudinary.js";

import  {addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload}  from '../controllers/productController.js'


const productRouter = express.Router()

productRouter.post('/upload-image', upload.single('my_file'),handleImageUpload)

productRouter.post('/add',addProduct)
productRouter.put('/edit/:id',editProduct)
productRouter.delete('/delete/:id',deleteProduct)
productRouter.get('/get',fetchAllProducts)

export default productRouter
