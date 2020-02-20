"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const currencySchema = new mongoose_1.default.Schema({
    name: { type: String },
    code: { type: String, unique: true, index: true }
}, {
    timestamps: true
});
exports.Currency = mongoose_1.default.model('Currency', currencySchema);
//# sourceMappingURL=Currency.js.map