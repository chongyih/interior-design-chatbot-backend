import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createNewChat = async (user_id: string) => {
    if (!user_id)
        return null

    const exist = await prisma.user.findFirst({
        where: {
            id: user_id
        }
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    if (!exist)
        return null

    const chat = await prisma.chat.create({
        data: {
            User: {
                connect: {
                    id: user_id
                }
            }
        }
    }).then(async (chat) => {
        await prisma.$disconnect()
        return chat
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chat
}

export const getAllChat = async (user_id: string) => {
    const exist = await prisma.chat.findFirst({
        where: {
            user_id: user_id
        }
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    if (!exist)
        return null

    const chats = await prisma.chat.findMany({
        where: {
            user_id: user_id ? user_id : undefined
        }
    }).then(async (chats) => {
        await prisma.$disconnect()
        return chats
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chats
}

export const createNewUser = async (name: string) => {
    const user = await prisma.user.create({
        data: {
            name: name,
        }
    }).then(async (user) => {
        await prisma.$disconnect()
        return user
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return user
}

export const createNewChatMessage = async (chat_id: string, user_prompt: string, full_response: string, gpt_response: string, dalle_prompt: string) => {
    if (!chat_id)
        return null

    const chatMessage = await prisma.chatMessage.create({
        data: {
            user_prompt: user_prompt,
            gpt_response: gpt_response,
            dalle_prompt: dalle_prompt,
            full_response: full_response,
            Chat: {
                connect: {
                    id: chat_id
                }
            }
        }
    }).then(async (chatMessage) => {
        await prisma.$disconnect()
        return chatMessage
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chatMessage
}

export const getChatMessages = async (chat_id: string) => {
    if (!chat_id)
        return null

    const chatMessages = await prisma.chatMessage.findMany({
        where: {
            chat_id: chat_id
        }
    }).then(async (chatMessages) => {
        await prisma.$disconnect()
        return chatMessages
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chatMessages
}

export const deleteChatMessages = async (chat_id: string) => {
    const status = await prisma.chatMessage.deleteMany({
        where: {
            chat_id: chat_id ? chat_id : undefined
        }
    }).then(async (status) => {
        await prisma.$disconnect()
        return status
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return status
}

export const updateImage = async (chat_id: string, image: string) => {
    const chat = await prisma.chat.update({
        where: {
            id: chat_id ? chat_id : undefined
        },
        data: {
            image: image
        }
    }).then(async (chat) => {
        await prisma.$disconnect()
        return chat
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chat
}

export const getImage = async (chat_id: string) => {
    const chat = await prisma.chat.findUnique({
        where: {
            id: chat_id ? chat_id : undefined
        }
    }).then(async (chat) => {
        await prisma.$disconnect()
        return chat
    }).catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
    })

    return chat ? chat.image : null
}