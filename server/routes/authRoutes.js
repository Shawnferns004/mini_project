import express from "express";
import { registerUser, loginUser, logoutUser, authMiddleware } from "../controllers/authController.js";


const userRouter = express.Router();

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.post('/logout', logoutUser)

userRouter.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user
    res.json({
        success: true,
        message: "Authenticated User",
        user
    })
})


export default userRouter