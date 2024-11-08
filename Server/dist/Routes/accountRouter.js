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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const authorization_1 = __importDefault(require("../Middlewares/authorization"));
const accountRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
accountRouter.get("/getBalance", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const data = yield prisma.account.findFirst({
            where: { userId: userId }
        });
        res.json({ message: "Fetch successful", success: true, account: data });
    }
    catch (error) {
        res.json({ message: "Error in fetching account info", success: false });
    }
}));
exports.default = accountRouter;
