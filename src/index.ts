import server from "./server"

const port = process.env.PORT || 5000

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}

startServer()