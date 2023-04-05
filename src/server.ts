import express from "express"
import cors from "cors"
import routes from "./routes"
import path from 'path'

const app = express()
const bodyParser = express.json({ limit: "50mb" })

app.use(cors())
app.use(bodyParser)

app.use(routes)

export default app