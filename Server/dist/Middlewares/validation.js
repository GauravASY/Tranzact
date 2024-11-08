"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
function validation(req, res, next) {
    const requiredBody = zod_1.default.object({
        username: zod_1.default.string().max(50).min(3),
        email: zod_1.default.string().email({ message: "Wrong Email" }).min(6).max(50),
        password: zod_1.default.string().max(50).min(5, { message: "password too small" })
    });
    requiredBody.safeParse(req.body).success ? next() : res.json({ message: "Check Credentials. Validation Failed" });
}
exports.default = validation;
