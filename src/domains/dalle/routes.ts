import axios from "axios"
import express from "express"
import { getImage, updateImage } from "../../utils/db"
import { authenticateOpenAi } from "../../utils/openai"
import { createImage, editBaseImage, storeImage } from "./controller"

const router = express.Router()

router.use((req, res, next) => {
    console.log("DALL-E Time: ", Date.now())
    next()
})

router.post('/', async (req, res) => {
    const { prompt } = req.body

    try {
        const openai = authenticateOpenAi()
        const response = await createImage(openai, prompt)

        res.json(response)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/upload', async (req, res) => {
    const { chat_id, image } = req.body

    try {
        await storeImage(res, chat_id, image)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/delete', async (req, res) => {
    const { chat_id } = req.body

    try {
        const deleteStatus = await updateImage(chat_id, "")

        if (deleteStatus) {
            res.json("Image Deleted")
        } else {
            res.status(500).json("Failed to delete image")
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

router.post('/get', async (req, res) => {
    const { chat_id } = req.body

    try {
        const imageLink = await getImage(chat_id)

        res.json({ imageLink: imageLink })
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/edit', async (req, res) => {
    const { prompt, baseImage } = req.body

    try {
        const imageLinks = await editBaseImage(prompt, baseImage)

        const convertImage = async (link: string) => {
            const resp = await axios.get(link, {
                responseType: 'arraybuffer'
            })

            const b64 = Buffer.from(resp.data, 'binary').toString('base64')
            return b64
        }

        const imageB64 = await Promise.all(imageLinks.map(convertImage))

        res.json(imageB64)
    }
    catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

export default router