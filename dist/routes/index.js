"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../domains/user/routes"));
const dalle_1 = __importDefault(require("../domains/dalle"));
const routes_2 = __importDefault(require("../domains/gpt/routes"));
const chat_1 = __importDefault(require("../domains/chat"));
const router = express_1.default.Router();
router.use("/user", routes_1.default);
router.use("/gpt", routes_2.default);
router.use("/dalle", dalle_1.default);
router.use("/chat", chat_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map