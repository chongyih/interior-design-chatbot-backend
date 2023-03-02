import express from "express"
const router = express.Router()
import { authenticateOpenAi, createCompletion } from "./controller"

router.use((req, res, next) => {
    console.log("Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { text } = req.body

    try {

        const openai = authenticateOpenAi()
        const response = await createCompletion(openai, text)

        res.json(response)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router