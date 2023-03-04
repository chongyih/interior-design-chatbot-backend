import express from "express"
import { createNewChatMessage } from "../../utils/db"
import { authenticateOpenAi } from "../../utils/openai"
import { createCompletion, extractPrompts } from "./controller"

const router = express.Router()

router.use((req, res, next) => {
    console.log("GPT Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { prompt, chat_id, user_id } = req.body

    try {
        const openai = authenticateOpenAi()
        const response = await createCompletion(openai, prompt)

        const { GPTPrompt, DALLEPrompts } = extractPrompts(response)
        const createMessage = createNewChatMessage(chat_id, prompt, GPTPrompt, DALLEPrompts)

        console.log(createMessage)

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