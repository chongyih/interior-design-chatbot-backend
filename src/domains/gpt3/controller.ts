import { Configuration, OpenAIApi } from "openai"

export const authenticateOpenAi = (): OpenAIApi => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })

    return new OpenAIApi(configuration)
}

export const createCompletion = async (openai: OpenAIApi, text: string): Promise<string> => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
    })

    return response.data.choices[0].text
}