import express from 'express'
import connectDB from './config/mongoDb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'

const app =express()
const port = process.env.PORT || 5000

connectDB()
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders:[
      "Content-Type",
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ]
  };

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/auth/',userRouter)
app.use('/api/admin/products', productRouter)


app.listen(port, ()=> console.log("Server started on PORT "+ port))


