import express from "express"
import gpt3Routes from "../domains/gpt3/routes"

const router = express.Router()

router.use("/gpt3", gpt3Routes)

export default router