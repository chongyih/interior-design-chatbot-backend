import express from "express"
import dalleRoute from "../domains/dall-e"
import gpt3Routes from "../domains/gpt3/routes"

const router = express.Router()

router.use("/gpt3", gpt3Routes)
router.use("/dalle", dalleRoute)

export default router