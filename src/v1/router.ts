import express from "express"
import { cartRouter } from "./cart/cart.router"
import { Auth } from "./middlewares/auth"
import { orderRouter } from "./order/order.router"
import { productRouter } from "./product/product.router"
import { userRouter } from "./user/user.router"
import { whishlistRouter } from "./whishlist/whishlist.router"

export const v1Router = express.Router()

v1Router.use("/v1", productRouter)
v1Router.use("/v1", userRouter)
v1Router.use("/v1", Auth.authenticated, cartRouter)
v1Router.use("/v1", orderRouter)
v1Router.use("/v1", whishlistRouter)
