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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../../utils/db");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("Chat Time: ", Date.now());
    next();
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    try {
        const id = yield (0, db_1.getAllChat)(user_id);
        id ? res.json(id.map((chat) => chat.id)) : res.status(500).json('No Chats Found');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    try {
        const chat = yield (0, db_1.createNewChat)(user_id);
        chat ? res.json(chat.id) : res.status(500).json('Chat Creation Failed');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id } = req.body;
    try {
        const history = yield (0, db_1.getChatMessages)(chat_id);
        history ? res.json(history.map((message) => {
            return {
                UserPrompt: message.user_prompt,
                GPTPrompt: message.gpt_response,
                DALLEPrompts: message.dalle_prompt,
            };
        })) : res.status(500).json('No History Found');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id } = req.body;
    try {
        const deleteStatus = yield (0, db_1.deleteChatMessages)(chat_id);
        if (deleteStatus)
            res.json('Delete Successful');
        else
            res.status(500).json('Delete Failed');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map