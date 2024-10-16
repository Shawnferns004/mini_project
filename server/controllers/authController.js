import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


//register
const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with same email Id",
      });
    }

    const user = new User({ name, email, password: hashPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.json({
            success: false,
            message: "User not found with this email Id",
        })
    }
    const checkPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!checkPasswordMatch) {
        return res.json({
            success: false,
            message: "Incorrect Password! ",
        }) 
    }
    const token = jwt.sign({
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
        name :existingUser.name
    },'CLIENT_SECRETE_KEY',{expiresIn: '60m'})

    res.cookie('token',token,{httpOnly: true, secure:false}).json({
        success: true,
        message: "Login Successfull",
        user: {
            email: existingUser.email,
            role: existingUser.role,
            id: existingUser._id,
            name :existingUser.name

        }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//logout
const logoutUser =  (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully",
    })
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized, no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRETE_KEY');
    
    req.user = decoded;
    
    next();

  } catch (error) {
    return res.json({
      success: false,
      message: error.message, 
    });
  }
};


export { registerUser, loginUser, logoutUser,authMiddleware };
