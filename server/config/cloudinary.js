import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'


cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
    console.log('Cloudinary connected')


const storage = new multer.memoryStorage()

const imageUpladUtil = async(file) =>{
    const result = await cloudinary.uploader.upload(file,{resource_type : 'auto'} )

    return result.secure_url
}

const upload = multer({storage})

export {upload, imageUpladUtil} 