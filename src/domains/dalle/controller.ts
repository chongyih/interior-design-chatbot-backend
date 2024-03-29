import { CreateImageRequestSizeEnum, OpenAIApi } from "openai"
import AWS from "aws-sdk"
import { updateImage } from "../../utils/db"
import axios from "axios"
import Replicate from "replicate"

export const createImage = async (openai: OpenAIApi, prompt: string, n: number = 3, size: CreateImageRequestSizeEnum = "512x512"): Promise<string[]> => {
    const response = await openai.createImage({
        prompt: prompt,
        n: n,
        size: size,
        response_format: "b64_json"
    })

    return response.data.data.map((image: any) => image.b64_json)
}

export const storeImage = async (res: any, chat_id: string, image: string) => {
    const s3 = new AWS.S3({
        region: 'ap-southeast-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    })

    const params = {
        Bucket: 'interio-ai-base-image',
        Key: `${chat_id}.png`,
        Body: Buffer.from(image, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    }

    s3.upload(params, async (err: any, data: any) => {
        if (err) {
            res.status(500).json(err)
        }

        const updateStatus = await updateImage(chat_id, data.Location)

        if (!updateStatus)
            return res.status(500).json("Error uploading image")

        res.json({ imageLink: data.Location })
    })
}

export const editBaseImage = async (prompt: string, imageLink: string, samples: number = 2): Promise<string[] | Boolean | Number> => {
    // const resp = await axios.post("https://stablediffusionapi.com/api/v5/controlnet", {
    //     key: process.env.STABLE_DIFFUSION_KEY,
    //     controlnet_model: "canny",
    //     model_id: "midjourney",
    //     auto_hint: "yes",
    //     prompt: prompt,
    //     negative_prompt: null,
    //     init_image: imageLink,
    //     width: 512,
    //     height: 512,
    //     samples: samples,
    //     num_inference_steps: "30",
    //     safety_checker: "no",
    //     enhance_prompts: "yes",
    //     scheduler: "UniPCMultistepScheduler",
    //     guidance_scale: 7.5,
    //     strength: 0.7,
    //     seed: null,
    //     webhook: null,
    //     track_id: null
    // })

    // const resp = await axios.post("https://stablediffusionapi.com/api/v5/interior", {
    //     key: process.env.STABLE_DIFFUSION_KEY,
    //     prompt: prompt,
    //     init_image: imageLink
    // })

    // if (resp.data.status === "failed" || resp.data.status === "error") {
    //     console.error(resp.data)
    //     return false
    // }

    // if (resp.data.status === "processing") {
    //     return resp.data.eta
    // } else if (resp.data.output) {
    //     return resp.data.output
    // }

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN, userAgent: 'Interio AI' })

    // @ts-ignore
    const output: string[] = await replicate.run(
        "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        {
            input: {
                image: imageLink,
                prompt: prompt,
                num_samples: "1",
            }
        }
    )

    output.shift()

    return output
}   