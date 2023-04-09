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
const openai_1 = require("../../utils/openai");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("GPT Time: ", Date.now());
    next();
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, chat_id } = req.body;
    try {
        const openai = (0, openai_1.authenticateOpenAi)();
        const messages = yield (0, db_1.getChatMessages)(chat_id);
        const previousPrompts = messages ? messages.flatMap((message) => [
            { "role": 'user', "content": message.user_prompt },
            { "role": 'assistant', "content": message.full_response }
        ]) : [];
        const response = yield (0, controller_1.createCompletion)(openai, previousPrompts.concat({ "role": "user", "content": prompt }));
        const { GPTPrompt, DALLEPrompts } = (0, controller_1.extractPrompts)(response);
        const createMessage = yield (0, db_1.createNewChatMessage)(chat_id, prompt, response, GPTPrompt, DALLEPrompts);
        createMessage ? res.json({
            GPTPrompt,
            DALLEPrompts
        }) : res.status(500).json('Message Creation Failed');
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map