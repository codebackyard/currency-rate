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
const Country_1 = require("../models/Country");
const actions_1 = require("../actions");
exports.queryCurrency = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield actions_1.GetCountries();
    console.log(`the number is: ${data.length}`);
    yield Promise.all(data.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        const exist = yield Country_1.Country.findOne({ name: c.name });
        if (!exist) {
            yield Country_1.Country.create({
                name: c.name,
                region: c.region,
                timezones: c.timezones,
                currency: { name: c.currencies[0].name, code: c.currencies[0].code }
            });
        }
    })));
    res.json(data);
});
//# sourceMappingURL=country.js.map