import express from "express"
import { OrderController } from "./order.controller"

export const orderRouter = express.Router()

orderRouter.get("/orders", OrderController.getOrders)
orderRouter.post("/checkout", OrderController.addOrder)
