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
exports.createUser = void 0;
const createUser = (openai, prompt, n = 3, size = "1024x1024") => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.createImage({
        prompt: prompt,
        n: n,
        size: size,
    });
    return response.data.data[0].url;
});
exports.createUser = createUser;
//# sourceMappingURL=controller.js.map