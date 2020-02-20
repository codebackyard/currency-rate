"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    profile: {
        email: String
    }
}, { timestamps: true });
userSchema.pre('save', function save(next) {
    const user = this;
    bcrypt_nodejs_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_nodejs_1.default.hash(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    console.log(candidatePassword);
    console.log(this.password);
    if (this.password != null) {
        bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
            console.log(`its match? ${isMatch}`);
            cb(err, isMatch);
        });
    }
};
userSchema.methods.comparePassword = comparePassword;
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map