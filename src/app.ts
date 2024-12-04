import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { AppDataSource } from "./data-source"
import { v1Router } from "./v1/router"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(v1Router)

app.get("/", (req, res) => {
  res.status(200).json({ body: "hello" })
})

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected")
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
