import express from "express"
import { Auth } from "../middlewares/auth"
import { UserController } from "./user.controller"

export const userRouter = express.Router()

userRouter.post("/signup", UserController.signUp)
userRouter.post("/login", UserController.login)
userRouter.get("/user", Auth.authenticated, UserController.getUser)
