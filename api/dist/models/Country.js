"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const countrySchema = new mongoose_1.default.Schema({
    name: { type: String },
    code: { type: String },
    timezones: { type: [String] },
    region: String,
    currency: {
        code: String,
        name: String
    }
}, {
    timestamps: true
});
exports.Country = mongoose_1.default.model('Country', countrySchema);
//# sourceMappingURL=Country.js.map