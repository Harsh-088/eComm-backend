import { Request, Response } from "express"

export const asyncErrorHandler = (
  asyncFn: (req: Request, res: Response) => any
) => {
  return async (req: Request, res: Response) => {
    try {
      await asyncFn(req, res)
    } catch (error) {
      console.error("Error:", error)
      res.status(500).json({ error: error })
    }
  }
}
