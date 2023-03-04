import User from '../database/models/user'
import Chat from '../database/models/chat'
import ChatMessage from '../database/models/chatmessage'

export const createNewChat = async (user_id: number) => {
    const chat = Chat.create({
        user_id: user_id
    })

    return chat
}

export const createNewUser = async (name: string, email?: string) => {
    const user = User.create({
        name: name,
        email: email
    })

    return user
}

export const createNewChatMessage = async (chat_id: number, user_prompt: string, gpt_response: string, dalle_prompt: string[]) => {
    const chatMessage = ChatMessage.create({
        chat_id: chat_id,
        user_prompt: user_prompt,
        gpt_response: gpt_response,
        dalle_prompt: dalle_prompt
    })

    return chatMessage
}