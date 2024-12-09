import bcrypt, { compare } from "bcrypt"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { ObjectId } from "mongodb"
import { AppDataSource } from "../../data-source"
import { asyncErrorHandler } from "../../utils/errorHandler"
import { User } from "./user.entity"

export class UserController {
  static signUp = asyncErrorHandler(async (req: Request, res: Response) => {
    const name: string | undefined = req.body.name
    const email: string | undefined = req.body.email
    const password: string | undefined = req.body.password
    const address: string | undefined = req.body.address

    if (!name || !email || !password) {
      return res.status(406).json({ message: "Missing required values!" })
    }

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return res.status(406).json({ message: "Values can not be empty!" })
    }

    const userRepo = AppDataSource.getMongoRepository(User)

    const existingUser = await userRepo.findOne({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with provided email already exists!" })
    }

    const passwordSalt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, passwordSalt)

    const user = userRepo.create({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      createdOn: new Date().toISOString()
    })

    const userData = await userRepo.save(user)

    res.status(200).json({
      message: "User created!",
      user: userData
    })
  })

  static login = asyncErrorHandler(async (req: Request, res: Response) => {
    const email: string | undefined = req.body.email
    const password: string | undefined = req.body.password

    if (!email || !password) {
      return res.status(406).json({ message: "Missing required values!" })
    }

    const userRepo = AppDataSource.getMongoRepository(User)

    const user = await userRepo.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with provided email does not exists!" })
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect Password!" })
    }

    const token = sign({ userId: user._id }, process.env.PASSWORD_KEY!, {
      expiresIn: "1h"
    })

    return res.status(202).json({ message: "Login Successfull!", token: token })
  })

  static getUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const userId: string | undefined = req.headers.userId as string | undefined

    const userRepo = AppDataSource.getMongoRepository(User)

    const user = await userRepo.findOne({
      where: {
        _id: new ObjectId(userId)
      }
    })

    return res
      .status(200)
      .json({ message: "User fetched successfully!", data: user })
  })
}
