import User from '../database/models/user'
import Chat from '../database/models/chat'
import ChatMessage from '../database/models/chatmessage'

export const createNewChat = async (user_id: number) => {
    const chat = Chat.create({
        user_id: user_id
    })

    return chat
}

export const getAllChat = async (user_id: number) => {
    const chats = Chat.findAll({
        where: {
            user_id: user_id
        }
    })

    return chats
}

export const getChatHistory = async (chat_id: number) => {
    const chatHistory = ChatMessage.findAll({
        where: {
            chat_id: chat_id
        }
    })
}

export const createNewUser = async (name: string, email?: string) => {
    const user = User.create({
        name: name,
        email: email
    })

    return user
}

export const createNewChatMessage = async (chat_id: number, user_prompt: string, full_response: string, gpt_response: string, dalle_prompt: string[]) => {
    const chatMessage = ChatMessage.create({
        chat_id: chat_id,
        user_prompt: user_prompt,
        gpt_response: gpt_response,
        dalle_prompt: dalle_prompt,
        full_response: full_response
    })

    return chatMessage
}

export const getChatMessages = async (chat_id: number) => {
    const chatMessages = ChatMessage.findAll({
        where: {
            chat_id: chat_id
        }
    })

    return chatMessages
}

export const deleteChatMessages = async (chat_id: number) => {
    const status = ChatMessage.destroy({
        where: {
            chat_id: chat_id
        }
    })

    return status
}

export const updateImage = async (chat_id: string, image: string) => {
    const chat = await Chat.findByPk(chat_id)

    chat.set('image', image)

    chat.save()

    return chat
}

export const getImage = async (chat_id: string) => {
    const chat = await Chat.findByPk(chat_id)

    return chat.get('image')
}