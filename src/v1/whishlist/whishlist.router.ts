import express from "express"
import { Whishlistontroller } from "./whishlist.controller"

export const whishlistRouter = express.Router()

whishlistRouter.get("/whishlists", Whishlistontroller.getWhishlist)
whishlistRouter.post("/whishlist/add-product", Whishlistontroller.addProduct)
whishlistRouter.post(
  "/whishlist/remove-product",
  Whishlistontroller.removeProduct
)
