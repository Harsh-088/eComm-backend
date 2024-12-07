import { NextFunction, Request, Response } from "express"

export const asyncErrorHandler = (
  asyncFn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFn(req, res, next)
    } catch (error) {
      console.error("Error:", error)
      res.status(500).json({ error: error })
    }
  }
}
