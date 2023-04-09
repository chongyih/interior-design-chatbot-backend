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
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
const chatmessage_1 = __importDefault(require("./chatmessage"));
const __1 = __importDefault(require("../"));
const Chat = __1.default.define('Chat', {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        references: {
            model: user_1.default,
            key: 'id'
        }
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.default.sync();
}))();
Chat.hasMany(chatmessage_1.default, {
    foreignKey: 'chat_id',
    as: 'messages',
    onDelete: 'CASCADE'
});
exports.default = Chat;
//# sourceMappingURL=chat.js.map