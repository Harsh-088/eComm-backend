import express from "express"
import { cartRouter } from "./cart/cart.router"
import { productRouter } from "./product/product.router"
import { userRouter } from "./user/user.router"

export const v1Router = express.Router()

v1Router.use("/v1", productRouter)
v1Router.use("/v1", cartRouter)
v1Router.use("/v1", userRouter)
