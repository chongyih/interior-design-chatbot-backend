import express from "express"

import userRoutes from "../domains/user/routes"
import dalleRoute from "../domains/dalle"
import gptRoutes from "../domains/gpt/routes"
import chatRoutes from "../domains/chat"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/gpt", gptRoutes)
router.use("/dalle", dalleRoute)
router.use("/chat", chatRoutes)

export default router