import express from "express"
const router = express.Router()

const gpt3Routes = require("../domains/gpt3/routes")

router.use("/gpt3", gpt3Routes)

module.exports = router