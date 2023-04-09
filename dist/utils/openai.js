"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateOpenAi = void 0;
const openai_1 = require("openai");
const authenticateOpenAi = () => {
    const configuration = new openai_1.Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    return new openai_1.OpenAIApi(configuration);
};
exports.authenticateOpenAi = authenticateOpenAi;
//# sourceMappingURL=openai.js.map