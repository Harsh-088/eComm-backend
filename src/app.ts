import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { v1Router } from "./v1/router"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("dev"))

app.use(v1Router)

app.get("/", (req, res) => {
  res.status(200).json({ body: "hello" })
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
