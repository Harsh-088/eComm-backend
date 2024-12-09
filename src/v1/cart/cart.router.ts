import express from "express"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { Auth } from "../middlewares/auth"
import { CartController } from "./cart.controller"

export const cartRouter = express.Router()

cartRouter.get(
  "/cart",
  Auth.authenticated,
  asyncErrorHandler(CartController.getCart)
)
cartRouter.post(
  "/add-to-cart",
  Auth.authenticated,
  asyncErrorHandler(CartController.addToCart)
)
