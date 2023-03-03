import express from "express"
import { authenticateOpenAi } from "../../utils/openai"
import { createImage } from "./controller"

const router = express.Router()

router.use((req, res, next) => {
    console.log("DALL-E Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { prompt } = req.body

    try {
        const openai = authenticateOpenAi()
        const response = await createImage(openai, prompt)

        res.json(response)

    } catch (error) {
        res.status(500).json(error)
    }
})

export default router