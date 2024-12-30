import { Request, Response } from "express"
import { ObjectId } from "typeorm"
import { AppDataSource } from "../../data-source"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { Product } from "../product/product.entity"
import { User } from "../user/user.entity"
import { Order } from "./order.entity"

export class OrderController {
  static getOrders = asyncErrorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0

    const userId: string = req.headers.userId as string

    const orderRepo = AppDataSource.getMongoRepository(Order)

    const orders = await orderRepo.find({
      skip: skip,
      take: limit,
      where: { userId: new ObjectId(userId) }
    })

    return res.status(200).json({
      message: "Successfull!",
      data: orders,
      count: orders.length,
      skip: skip,
      limit: limit
    })
  })

  static addOrder = asyncErrorHandler(async (req: Request, res: Response) => {
    const userId: string = req.headers.userId as string
    const paymentId: string | undefined = req.body.paymentId
    const deliveryCharge: number | undefined = req.body.deliveryCharge
    const gstCharge: number | undefined = req.body.gstCharge
    const products: Array<Product> | undefined = req.body.products

    if (!paymentId) {
      return res.status(400).json({ message: "PaymentId is required!" })
    }

    if (!products) {
      return res.status(400).json({ message: "Products are required!" })
    }

    const userRepo = AppDataSource.getMongoRepository(User)
    const orderRepo = AppDataSource.getMongoRepository(Order)

    const user = await userRepo.findOne({
      where: {
        _id: new ObjectId(userId)
      }
    })

    if (!user) {
      return res.status(400).json({ message: "User not found!" })
    }

    const order = new Order()
    order.userId = new ObjectId(userId)
    order.userName = user.name
    order.userEmail = user.email
    order.paymentId = paymentId
    order.deliveryCharge = deliveryCharge || 25
    order.gstCharge = gstCharge || 18
    order.totalAmount = products.reduce(
      (acc, product) => acc + product.rate!,
      0
    )
    order.products = products

    await orderRepo.save(order)

    return res.status(200).json({ message: "Order created successfully!" })
  })
}
