import express from "express"
import { createNewChat } from "../../utils/db"

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

export default router