import server from "./server"
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname + '/../.env' })
const port = process.env.PORT || 5000

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}

startServer()