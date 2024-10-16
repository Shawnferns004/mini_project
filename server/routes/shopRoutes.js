import express from "express";
import getFilterProducts from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get('/get', getFilterProducts)


export default shopRouter