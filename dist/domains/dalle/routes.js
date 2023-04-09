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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../../utils/db");
const openai_1 = require("../../utils/openai");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("DALL-E Time: ", Date.now());
    next();
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    try {
        const openai = (0, openai_1.authenticateOpenAi)();
        const response = yield (0, controller_1.createImage)(openai, prompt);
        res.json(response);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id, image } = req.body;
    try {
        yield (0, controller_1.storeImage)(res, chat_id, image);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id } = req.body;
    try {
        const deleteStatus = yield (0, db_1.updateImage)(chat_id, "");
        if (deleteStatus) {
            res.json("Image Deleted");
        }
        else {
            res.status(500).json("Failed to delete image");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id } = req.body;
    try {
        const imageLink = yield (0, db_1.getImage)(chat_id);
        res.json({ imageLink: imageLink });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, baseImage } = req.body;
    try {
        const imageLinks = yield (0, controller_1.editBaseImage)(prompt, baseImage);
        if (!imageLinks)
            res.status(500).json("Failed to edit image");
        const convertImage = (link) => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield axios_1.default.get(link, {
                responseType: 'arraybuffer'
            });
            const b64 = Buffer.from(resp.data, 'binary').toString('base64');
            return b64;
        });
        let imageB64;
        if (Array.isArray(imageLinks))
            imageB64 = yield Promise.all(imageLinks.map(convertImage));
        res.json(imageB64);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map