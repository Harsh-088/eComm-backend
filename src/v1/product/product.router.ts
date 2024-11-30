import express from "express"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { ProductController } from "./product.controller"

export const productRouter = express.Router()

productRouter.get("/products", asyncErrorHandler(ProductController.getProducts))
