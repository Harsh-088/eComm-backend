import express from "express"
import { productRouter } from "./product/product.router"

export const v1Router = express.Router()

v1Router.use("/v1", productRouter)
