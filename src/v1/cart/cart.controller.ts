import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { AppDataSource } from "../../data-source"
import { Product } from "../product/product.entity"
import { Cart, CartProduct } from "./cart.entity"

export class CartController {
  static async addToCart(req: Request, res: Response) {
    const userId: string = req.headers.userId as string

    const productId: string | undefined = req.body.productId

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

    const cartRepo = AppDataSource.getMongoRepository(Cart)

    let cart = await cartRepo.findOneBy({ userId: new ObjectId(userId) })

    if (!cart) {
      cart = new Cart()
      cart.userId = new ObjectId(userId)
      cart.products = []
    }

    const cartProd = cart.products.find(
      prod => prod.productId.toString() == productId
    )

    if (cartProd) {
      return res
        .status(406)
        .json({ message: "Specified product already exists in cart!" })
    }

    // const newCartProd = { productId: new ObjectId(productId), quantity: 1 }
    const newCartProd = new CartProduct()

    newCartProd.productId = new ObjectId(productId)
    newCartProd.quantity = 1

    cart.products.push(newCartProd)

    await cartRepo.save(cart)

    return res.status(200).json({ message: "Product added to cart!" })
  }

  static async getCart(req: Request, res: Response) {
    const userId = req.headers.userId as string

    const cartRepo = AppDataSource.getMongoRepository(Cart)

    const cart = await cartRepo.findOneBy({ userId: new ObjectId(userId) })

    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart fetched successfull!", data: [] })
    }

    const cartItems = []
    const prodIds = cart.products.map(e => e.productId)

    const cartProds = await AppDataSource.getMongoRepository(Product).find({
      where: { _id: { $in: prodIds } }
    })

    for (let index = 0; index < cartProds.length; index++) {
      const product = cartProds[index]
      const cartItem = {
        productName: product.name,
        productDes: product.description,
        productRate: product.rate,
        productTag: product.tag,
        productId: product._id,
        quantity: cart.products.find(
          cartProd => cartProd.productId == product._id
        )?.quantity
      }

      cartItems.push(cartItem)
    }

    return res.status(200).json({ message: "Successfull!", data: cartItems })
  }
}
