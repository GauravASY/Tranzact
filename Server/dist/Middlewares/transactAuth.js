"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function transactAuth(req, res, next) {
    const transactToken = req.headers.transacttoken;
    if (!transactToken) {
        res.json({ message: "Auth Error hogya hai", success: false });
        return;
    }
    try {
        const token = jsonwebtoken_1.default.verify(transactToken, process.env.JWT_TRANSACT_SECRET);
        if (token) {
            req.transactData = token;
            next();
        }
        else {
            res.json({ message: "invalid Token", success: false });
        }
    }
    catch (error) {
        res.json({ message: "Error in transactAuth", success: false });
    }
}
exports.default = transactAuth;
