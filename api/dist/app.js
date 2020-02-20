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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const secrets_1 = require("./util/secrets");
const userController = __importStar(require("./controllers/user"));
const passport_1 = __importDefault(require("passport"));
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms'));
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
});
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_flash_1.default());
app.post('/login', userController.postLogin);
app.post('/signup', userController.postSignup);
app.get('/good', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ ok: 'ok' });
}));
exports.default = app;
//# sourceMappingURL=app.js.map