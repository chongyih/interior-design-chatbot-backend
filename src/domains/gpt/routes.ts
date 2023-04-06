import express from "express"
import { ChatCompletionRequestMessage } from "openai"
import { createNewChatMessage, getChatMessages } from "../../utils/db"
import { authenticateOpenAi } from "../../utils/openai"
import { createCompletion, extractPrompts } from "./controller"

const router = express.Router()

router.use((req, res, next) => {
    console.log("GPT Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { prompt, chat_id } = req.body

    try {
        const openai = authenticateOpenAi()
        const messages = await getChatMessages(chat_id)
        const previousPrompts = messages ? messages.flatMap((message): ChatCompletionRequestMessage[] => [
            { "role": 'user', "content": message.user_prompt as string },
            { "role": 'assistant', "content": message.full_response as string }
        ]) : []
        const response = await createCompletion(openai, previousPrompts.concat({ "role": "user", "content": prompt as string }))

        const { GPTPrompt, DALLEPrompts } = extractPrompts(response)
        const createMessage = await createNewChatMessage(chat_id, prompt, response, GPTPrompt, DALLEPrompts)

        createMessage ? res.json({
            GPTPrompt,
            DALLEPrompts
        }) : res.status(500).json('Message Creation Failed')

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export default router