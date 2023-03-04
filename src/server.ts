import express from "express"
import cors from "cors"
import routes from "./routes"
import path from 'path'

const app = express()
const bodyParser = express.json({ limit: "50mb" })
const buildPath = path.join(__dirname, "..", "..", "interior-design-chatbot", "dist")

app.use(cors())
app.use(bodyParser)

app.use(express.static(buildPath))
app.get("/*", (req, res) => {
    res.sendFile(
        path.join(buildPath, "index.html"),
        (err) => {
            if (err)
                res.status(500).send(err)
        }
    )
})

app.use(routes)

export default app