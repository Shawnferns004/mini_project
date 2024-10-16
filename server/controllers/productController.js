import { imageUpladUtil } from "../config/cloudinary.js";
import Products from "../models/productModel.js";

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;  // Add the missing comma here
        const result = await imageUpladUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};



//add products
const addProduct = async (req, res) => {
    try {
        const {image, title, description, category, subCategory, price, salePrice, totalStock}= req.body

        const newProduct = new Products({
            image, title, description, category, subCategory, price, salePrice, totalStock
        })

        await newProduct.save()
        res.json({
            success:true,
            message: "Product added successfully",
            data: newProduct
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        
        const listOfProducts = await Products.find({})
        res.json({
            success:true,
            data: listOfProducts
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}



//edit products
const editProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {image, title, description, category, subCategory, price, salePrice, totalStock}= req.body

        let findProduct = await Products.findById(id)
        if (!findProduct) {
            return res.json({
                success :false,
                message: "Product not found"
            })
        }

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.subCategory = subCategory || subCategory.title
        findProduct.price = price=== '' ? 0:price || findProduct.price
        findProduct.salePrice = salePrice=== '' ? 0:salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image


        await findProduct.save()
        res.json({
            success: true,
            message: "Product updated successfully",
            data: findProduct
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


//delete products
const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Products.findByIdAndDelete(id)

        if (!product) {
            return res.json({
                success :false,
                message: "Product not found"
            })
        }

        res.json({
            success: true,
            message: "Product deleted successfully",
            data: product
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}



export {handleImageUpload, addProduct , fetchAllProducts, deleteProduct,editProduct};
