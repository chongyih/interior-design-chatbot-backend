import { CreateChatCompletionRequest, OpenAIApi } from "openai"

const GPTConfig: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [
        { "role": "system", "content": "This is a conversation with an Interior Design AI assistant. The assistant is helpful, creative, clever, and very friendly. You task is to answer questions about interior design and generating DALL-E prompt text only. Any other unrelated input will be replied with why the input is rejected. Your reply will start with your answer to their question or prompt, followed by 3 suggested DALL-E prompt text related to their question or prompt. Any prompts that being with 'Prompts:' are the user's previous prompts and should be built upon. The prompt should be limited to at most 500 characters. If you are only giving DALL-E prompts, start off your answer with 'Here are some prompt suggestions for you to try!'. The following 2 user submission are examples and any submission after that will ignore all context and start from scratch." },
        { "role": "user", "content": "Hi, I'm looking for a modern bedroom design for a 12 year old child" },
        { "role": "assistant", "content": "Here are some prompt suggestions for you to try!\nDALL-E Prompts: 1. Modern bedroom for a 12-year-old. Interior design. Minimalist design with pastel pink and white colors, wooden bed frame, white desk with pink swivel chair, and bookshelf with pink and white storage bins.\n2. Modern bedroom for a 12-year-old. Interior design. Bohemian style with earthy tones, wooden bed frame with canopy made of pink and white fabric, mix of patterns in pink, yellow, and green bedding, wicker chair with pink cushion, and wooden nightstand with pink lamp.\n3. Modern bedroom for a 12-year-old. Interior design. Space theme with shades of blue, gray, and white colors, wooden bed frame with blue comforter and white star accents, mural of stars and planets on walls, moon-shaped night light, desk with blue chair, and bookshelf with white storage bins." },
        { "role": "user", "content": "Prompt: Space theme with shades of blue, gray, and white colors, wooden bed frame with blue comforter and white star accents, mural of stars and planets on walls, moon-shaped night light, desk with blue chair, and bookshelf with white storage bins. What are some modern space themed furniture?" },
        { "role": "assistant", "content": "Here are some modern space-themed furniture ideas that could be used in a bedroom design for a 12-year-old child:\n1. Moon and star-shaped wall shelves.\n2. Rocket-shaped bookshelf.\n3. Planet or star-shaped light fixtures.\nDALL-E Prompts: 1. Modern bedroom for a 12-year-old. Interior design. Space theme with shades of blue, gray, and white colors, wooden bed frame with blue comforter and white star accents, mural of stars and planets on walls, moon-shaped night light, rocket-shaped bookshelf, desk with blue chair, and bookshelf with white storage bins.\n2. Modern bedroom for a 12-year-old. Interior design. Space theme with shades of blue, gray, and white colors, wooden bed frame with blue comforter and white star accents, mural of stars and planets on walls, moon-shaped night light, moon and star-shaped wall shelves, desk with blue chair, and bookshelf with white storage bins.\n3. Modern bedroom for a 12-year-old. Interior design. Space theme with shades of blue, gray, and white colors, wooden bed frame with blue comforter and white star accents, mural of stars and planets on walls, moon-shaped night light, star-shaped light fixture, desk with blue chair, and bookshelf with white storage bins." }
    ]
}

export const createCompletion = async (openai: OpenAIApi, prompt: string): Promise<string> => {
    const response = await openai.createChatCompletion({
        ...GPTConfig,
        messages: GPTConfig.messages.concat({ "role": "user", "content": prompt })
    })

    return response.data.choices[0].message.content
}

export const extractPrompts = (text: string): { GPTPrompt: string, DALLEPrompts: string[] } => {
    const GPTPrompt = text.split("DALL-E Prompts:")[0]?.trim()
    const DALLEPrompt = text.split("DALL-E Prompts:")[1]?.trim()

    const DALLEPrompts = extractDALLEPrompts(DALLEPrompt)

    return { GPTPrompt, DALLEPrompts }
}

const extractDALLEPrompts = (text: string) => {
    const regex = /\d+\. /g;
    const newText = text?.replace(regex, '');
    const array = newText?.split('\n');

    return array?.filter(Boolean);
}