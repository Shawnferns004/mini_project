import Products from "../models/productModel.js"



const getFilterProducts = async(req,res) =>{
    try {

        const {category =[], subCategory =[], sortBy = "price-lowtohigh"} = req.query

        let filters = {}

        if(category.length){
            filters.category ={$in: category.split(',')}
        }
        if(subCategory.length){
            filters.subCategory ={$in: subCategory.split(',')}
        }


        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
              sort.price = 1;
              break;
            case "price-hightolow":
              sort.price = -1;
              break;
            case "title-atoz":
              sort.title = 1;
              break;
            case "title-ztoa":
              sort.title = -1; // Fix this to sort Z-to-A
              break;
            default:
              sort.price = 1;
              break;
          }
          

        const products = await Products.find(filters).sort(sort)
        res.json({
            success:true,
            data: products
        })
    }catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}

export default getFilterProducts