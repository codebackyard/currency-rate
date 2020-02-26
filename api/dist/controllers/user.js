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
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../config/passport");
const User_1 = require("../models/User");
exports.postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    yield express_validator_1.check('password', 'Password cannot be blank')
        .isLength({ min: 6 })
        .run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors);
    }
    console.log('here');
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, 'secrete');
            return res.json({ user, token });
        });
    })(req, res, next);
});
exports.postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'email is not valid')
        .isEmail()
        .run(req);
    yield express_validator_1.check('password', 'Password must be at least 6 character')
        .isLength({ min: 6 })
        .run(req);
    yield express_validator_1.check('confirmPassword', 'Password confirmation does not match')
        .equals(req.body.password)
        .run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors);
    }
    const user = new User_1.User({ email: req.body.email, password: req.body.password });
    const existingUser = yield User_1.User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.json({ message: 'Email already registered' });
    }
    yield user.save();
    return res.json(user);
});
//# sourceMappingURL=user.js.map