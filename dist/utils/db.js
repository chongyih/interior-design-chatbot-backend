"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.updateImage = exports.deleteChatMessages = exports.getChatMessages = exports.createNewChatMessage = exports.createNewUser = exports.getAllChat = exports.createNewChat = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNewChat = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user_id)
        return null;
    const exist = yield prisma.user.findFirst({
        where: {
            id: user_id
        }
    }).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    if (!exist)
        return null;
    const chat = yield prisma.chat.create({
        data: {
            User: {
                connect: {
                    id: user_id
                }
            }
        }
    }).then((chat) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chat;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chat;
});
exports.createNewChat = createNewChat;
const getAllChat = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma.chat.findFirst({
        where: {
            user_id: user_id
        }
    }).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    if (!exist)
        return null;
    const chats = yield prisma.chat.findMany({
        where: {
            user_id: user_id ? user_id : undefined
        }
    }).then((chats) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chats;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chats;
});
exports.getAllChat = getAllChat;
const createNewUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: {
            name: name,
        }
    }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return user;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return user;
});
exports.createNewUser = createNewUser;
const createNewChatMessage = (chat_id, user_prompt, full_response, gpt_response, dalle_prompt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!chat_id)
        return null;
    const chatMessage = yield prisma.chatMessage.create({
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
    }).then((chatMessage) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chatMessage;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chatMessage;
});
exports.createNewChatMessage = createNewChatMessage;
const getChatMessages = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!chat_id)
        return null;
    const chatMessages = yield prisma.chatMessage.findMany({
        where: {
            chat_id: chat_id
        }
    }).then((chatMessages) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chatMessages;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chatMessages;
});
exports.getChatMessages = getChatMessages;
const deleteChatMessages = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield prisma.chatMessage.deleteMany({
        where: {
            chat_id: chat_id ? chat_id : undefined
        }
    }).then((status) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return status;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return status;
});
exports.deleteChatMessages = deleteChatMessages;
const updateImage = (chat_id, image) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield prisma.chat.update({
        where: {
            id: chat_id ? chat_id : undefined
        },
        data: {
            image: image
        }
    }).then((chat) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chat;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chat;
});
exports.updateImage = updateImage;
const getImage = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield prisma.chat.findUnique({
        where: {
            id: chat_id ? chat_id : undefined
        }
    }).then((chat) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        return chat;
    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        yield prisma.$disconnect();
    }));
    return chat ? chat.image : null;
});
exports.getImage = getImage;
//# sourceMappingURL=db.js.map