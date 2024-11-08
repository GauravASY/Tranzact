"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorization(req, res, next) {
    const token = req.headers.token;
    try {
        if (!token) {
            res.json({ message: "Sign-In first", success: false });
        }
        else {
            const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (verify) {
                req.userId = Number(verify);
                next();
            }
            else {
                res.json({ message: "Not signed-in", success: false });
            }
        }
    }
    catch (error) {
        res.json({ message: "Something went wrong", success: false });
    }
}
exports.default = authorization;
