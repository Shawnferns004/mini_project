import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    subCategory:{
        type:String,
    },
    price:{
        type:Number,
    },
    salePrice:{
        type:Number,
    },
    totalStock:{
        type:Number,
    },
    
},{timestamps: true})

const Products = mongoose.models.user || mongoose.model("Products", productSchema)

export default Products