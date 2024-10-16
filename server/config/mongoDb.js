import mongoose from "mongoose";

const connectDB = async() =>{

    mongoose.connection.on('connected',()=>{
        console.log("MongoDb is connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/trendify`)
}

export default connectDB