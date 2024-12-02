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
  static async addProduct(req: Request, res: Response) {
    const { name, description, tag, rate } = req.body

    if (!name || !description || !tag || !rate) {
      return res
        .status(400)
        .json({ message: "Required data missing for product creation!" })
    }

    if (typeof rate !== "number") {
      return res.status(400).json({ message: "Rate should be of type number!" })
    }

    const product = new Product()

    product.name = name
    product.description = description
    product.tag = tag
    product.rate = rate

    try {
      await AppDataSource.getMongoRepository(Product).save(product)
      return res.status(200).json({ message: "Product created!" })
    } catch (error) {
      return res
        .status(400)
        .json({
          message: "Something went wrong while creating product!",
          error: error
        })
    }
  }
}
