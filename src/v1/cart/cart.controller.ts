import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { AppDataSource } from "../../data-source"
import { Product } from "../product/product.entity"
import { Cart } from "./cart.entity"

export class CartController {
  static async addToCart(req: Request, res: Response) {
    const productId = req.body.productId

    if (!productId) {
      return res.status(400).json({ message: "Missing product Id!" })
    }
    const product = await AppDataSource.getMongoRepository(Product).findOneBy({
      _id: new ObjectId(productId)
    })

    if (!product) {
      return res
        .status(404)
        .json({ message: "No product was found with given ID!" })
    }

    const cart = new Cart()
    cart.productId = productId
    // cart.product = product

    const result = await AppDataSource.getMongoRepository(Cart).save(cart)
    return res.status(200).json({ message: "Product added to cart!" })
  }

  static async getCart(req: Request, res: Response) {
    AppDataSource.getMongoRepository(Cart)
      .find()
      .then(async cart => {
        var result: Product[] = []

        for (let index = 0; index < cart.length; index++) {
          const cartItem = cart[index]

          await AppDataSource.getMongoRepository(Product)
            .findOneBy({
              _id: new ObjectId(cartItem.productId)
            })
            .then(product => {
              if (product) {
                result[index] = product
              }
            })
            .catch(err => {
              return res
                .status(400)
                .json({ message: "Something went wrong!", error: err })
            })
        }

        return res.status(200).json({ message: "Success", cart: result })
      })
      .catch(err => {
        return res
          .status(400)
          .json({ message: "Something went wrong!", error: err })
      })
  }
}
