import express from "express"
import { createNewChat, getAllChat, getChatMessages } from "../../utils/db"

const router = express.Router()

router.use((req, res, next) => {
    console.log("Chat Time: ", Date.now())
    next()
})

router.post('/create', async (req, res) => {
    const { user_id } = req.body

    try {
        const chat = await createNewChat(user_id)

        res.json(chat)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    const { user_id } = req.body

    try {
        const id = await getAllChat(user_id)

        res.json(id.map((chat) => chat.toJSON().id))
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/history', async (req, res) => {
    const { chat_id } = req.body

    try {
        const history = await getChatMessages(chat_id)

        res.json(history.map((message) => {
            return {
                UserPrompt: message.toJSON().user_prompt,
                GPTPrompt: message.toJSON().gpt_response,
                DALLEPrompts: message.toJSON().dalle_prompt,
            }
        })
        )
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router