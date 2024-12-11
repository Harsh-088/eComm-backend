import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import multer from "multer"
import { AppDataSource } from "./data-source"
import { asyncErrorHandler } from "./utils/errorHandler"
import { fileUploader } from "./utils/fileUploader"
import { v1Router } from "./v1/router"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post(
  "/upload",
  upload.single("image"),
  asyncErrorHandler(async (req: express.Request, res: express.Response) => {
    const file = req.file
    const fileName: string | undefined = req.body.filename

    if (!file || !fileName) {
      return res.status(400).json({ message: "Image or Image name missing!" })
    }

    const location = await fileUploader(fileName, file)
    res.status(200).json({ message: "success", url: location })
  })
)
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
