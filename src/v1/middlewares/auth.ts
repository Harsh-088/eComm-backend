import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { asyncErrorHandler } from "../../utils/errorHandler"

export class Auth {
  static authenticated = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bearerToken = req.get("authorization")

        if (!bearerToken) {
          return res.status(403).json({ message: "Authorization Missing!" })
        }

        const token = bearerToken.split(" ")[1]

        if (!token) {
          return res.status(403).json({ message: "Auth token Missing!" })
        }

        const decodedToken = verify(token, process.env.PASSWORD_KEY!)

        if (typeof decodedToken !== "string") {
          req.headers.userId = decodedToken.userId
          return next()
        }

        throw "Something went wrong!"
      } catch (error: any) {
        console.log(error)

        if (error.name == "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid Token!" })
        }

        if (error.name == "TokenExpiredError") {
          return res.status(403).json({ message: "Expired Token!" })
        }

        throw error
      }
    }
  )
}
