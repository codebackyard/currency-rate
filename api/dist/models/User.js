"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    passowrd: { type: String },
    profile: {
        email: String
    }
}, { timestamps: true });
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt_nodejs_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_nodejs_1.default.hash(user.passowrd, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.passowrd = hash;
            return next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.passowrd, (err, isMatch) => {
        cb(err, isMatch);
    });
};
userSchema.methods.comparePassword = comparePassword;
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map