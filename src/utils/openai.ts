import { Configuration, OpenAIApi } from "openai"

export const authenticateOpenAi = (): OpenAIApi => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })

    return new OpenAIApi(configuration)
}