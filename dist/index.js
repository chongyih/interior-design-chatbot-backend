"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 5000;
const startServer = () => {
    server_1.default.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map