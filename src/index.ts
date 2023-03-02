import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const port = 5000

app.get('/', (_, res) => {
  res.status(200).send("hi")
})

app.listen(port, () => console.log(`Running on port ${port}`))