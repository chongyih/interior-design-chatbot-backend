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
const __1 = __importDefault(require("../"));
const chat_1 = __importDefault(require("./chat"));
const User = __1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.default.sync();
}))();
User.hasMany(chat_1.default, {
    foreignKey: 'user_id',
    as: 'chats',
    onDelete: 'CASCADE'
});
exports.default = User;
//# sourceMappingURL=user.js.map