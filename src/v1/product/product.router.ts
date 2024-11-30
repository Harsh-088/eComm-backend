import express from "express"

export const Router = express.Router()

Router.get("/find-all", (req, res) => {
  res.status(200).json({ message: "Product 4" })
})
