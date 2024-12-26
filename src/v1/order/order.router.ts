import express from "express"
import { OrderController } from "./order.controller"

export const orderRouter = express.Router()

orderRouter.get("/orders", OrderController.getOrders)
orderRouter.post("/checkout", OrderController.addOrder)
// orderRouter.post("/checkout-2", OrderController.addOrder2)
// userRouter.post("/login", UserController.login)
// userRouter.get("/user", Auth.authenticated, UserController.getUser)
