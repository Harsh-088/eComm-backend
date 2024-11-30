import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { Product } from "./product.entity"

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    AppDataSource.getMongoRepository(Product)
      .find()
      .then(products => {
        return res.status(200).json({ message: "Success!", products: products })
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Internal!", error: err })
      })
  }
}
