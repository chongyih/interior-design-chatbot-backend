import express from "express"
import { createNewUser } from "../../utils/db"

const router = express.Router()

router.use((req, res, next) => {
    console.log("Chat Time: ", Date.now())
    next()
})

router.post('/create', async (req, res) => {
    const { name, email } = req.body

    try {
        const user = await createNewUser(name, email)

        res.json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})

export default router