import express from "express"
import { createNewChat, deleteChatMessages, getAllChat, getChatMessages } from "../../utils/db"

const router = express.Router()

router.use((req, res, next) => {
    console.log("Chat Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { user_id } = req.body

    try {
        const id = await getAllChat(user_id)

        id ? res.json(id.map((chat) => chat.id)) : res.status(500).json('No Chats Found')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/create', async (req, res) => {
    const { user_id } = req.body

    try {
        const chat = await createNewChat(user_id)

        chat ? res.json(chat.id) : res.status(500).json('Chat Creation Failed')

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/history', async (req, res) => {
    const { chat_id } = req.body

    try {
        const history = await getChatMessages(chat_id)

        history ? res.json(history.map((message) => {
            return {
                UserPrompt: message.user_prompt,
                GPTPrompt: message.gpt_response,
                DALLEPrompts: message.dalle_prompt,
            }
        })
        ) : res.status(500).json('No History Found')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/delete', async (req, res) => {
    const { chat_id } = req.body

    try {
        const deleteStatus = await deleteChatMessages(chat_id)

        if (deleteStatus)
            res.json('Delete Successful')
        else
            res.status(500).json('Delete Failed')
    }
    catch (error) {
        res.status(500).json(error)
    }
})

export default router