import { CreateImageRequestSizeEnum, OpenAIApi } from "openai"

export const createImage = async (openai: OpenAIApi, prompt: string, n: number = 3, size: CreateImageRequestSizeEnum = "512x512"): Promise<string[]> => {
    const response = await openai.createImage({
        prompt: prompt,
        n: n,
        size: size,
        response_format: "b64_json"
    })

    return response.data.data.map((image: any) => image.b64_json)
}