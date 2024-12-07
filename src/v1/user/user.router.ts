import express from "express"
import { UserController } from "./user.controller"

export const userRouter = express.Router()

userRouter.post("/signup", UserController.signUp)
userRouter.post("/login", UserController.login)
