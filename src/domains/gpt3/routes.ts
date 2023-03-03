import express from "express"
import { authenticateOpenAi } from "../../utils/openai"
import { createCompletion, extractPrompts } from "./controller"

const router = express.Router()

router.use((req, res, next) => {
    console.log("GPT3 Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { prompt } = req.body

    try {
        const openai = authenticateOpenAi()
        const response = await createCompletion(openai, prompt)

        const { GPTPrompt, DALLEPrompts } = extractPrompts(response)
        res.json({
            GPTPrompt,
            DALLEPrompts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export default router