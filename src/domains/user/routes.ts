import express from "express"
import { createNewChat, createNewUser } from "../../utils/db"

const router = express.Router()

router.use((req, res, next) => {
    console.log("Chat Time: ", Date.now())
    next()
})

router.post('/create', async (req, res) => {
    const { name } = req.body

    try {
        const user = await createNewUser(name)

        if (user) {
            const chat = await createNewChat(user.id)
            if (!chat) {
                return res.status(500).json('Chat Creation Failed')
            }

            res.json({ id: user.id, name: user.name, chat_id: chat.id })
        } else
            res.status(500).json('User Creation Failed')

    } catch (error) {
        res.status(500).json(error)
    }
})

export default router