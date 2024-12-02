import express from "express"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { CartController } from "./cart.controller"

export const cartRouter = express.Router()

cartRouter.get("/cart", asyncErrorHandler(CartController.getCart))
cartRouter.post("/add-to-cart", asyncErrorHandler(CartController.addToCart))
