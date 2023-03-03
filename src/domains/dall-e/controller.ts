import { CreateImageRequestSizeEnum, OpenAIApi } from "openai"

export const createImage = async (openai: OpenAIApi, prompt: string, n: number = 3, size: CreateImageRequestSizeEnum = "1024x1024"): Promise<string> => {
    const response = await openai.createImage({
        prompt: prompt,
        n: n,
        size: size,
    })

    return response.data.data[0].url
}