require("./config/db")

import express from "express"
import cors from "cors"
import routes from "./routes"

const app = express()
const bodyParser = express.json

app.use(cors())
app.use(bodyParser())
app.use(routes)

export default app