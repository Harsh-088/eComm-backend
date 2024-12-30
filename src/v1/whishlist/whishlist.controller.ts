import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { Whishlist } from "./whishlist.entity"

export class Whishlistontroller {
  static addProduct = asyncErrorHandler(async (req: Request, res: Response) => {
    const userId: string = req.headers.userId as string
    const productId: string | undefined = req.body.productId

    if (!productId) {
      return res.status(400).json({ message: "Missing product ID!" })
    }

    const whishlistRepo = AppDataSource.getMongoRepository(Whishlist)

    const whishlist = new Whishlist()
    whishlist.userId = userId
    whishlist.productId = productId

    await whishlistRepo.save(whishlist)

    return res.status(200).json({ message: "Product added to whishlist!" })
  })

  static removeProduct = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const userId: string = req.headers.userId as string
      const productId: string | undefined = req.body.productId

      if (!productId) {
        return res.status(400).json({ message: "Missing product ID!" })
      }

      const whishlistRepo = AppDataSource.getMongoRepository(Whishlist)

      await whishlistRepo.deleteOne({
        userId: userId,
        productId: productId
      })

      return res
        .status(200)
        .json({ message: "Product removed from whishlist!" })
    }
  )
  static getWhishlist = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0

      const userId: string = req.headers.userId as string

      const whishlistRepo = AppDataSource.getMongoRepository(Whishlist)

      const whishlist = await whishlistRepo.find({
        skip: skip,
        take: limit,
        where: {
          userId: userId
        }
      })

      console.log(whishlist)

      return res
        .status(200)
        .json({
          message: "Whishlist fetched!",
          data: whishlist,
          count: whishlist.length,
          skip: skip,
          limit: limit
        })
    }
  )
}
