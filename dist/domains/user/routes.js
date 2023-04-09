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
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const user = yield (0, db_1.createNewUser)(name);
        if (user) {
            const chat = yield (0, db_1.createNewChat)(user.id);
            if (!chat) {
                return res.status(500).json('Chat Creation Failed');
            }
            res.json({ id: user.id, name: user.name, chat_id: chat.id });
        }
        else
            res.status(500).json('User Creation Failed');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map