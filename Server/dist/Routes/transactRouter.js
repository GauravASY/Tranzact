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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const transactAuth_1 = __importDefault(require("../Middlewares/transactAuth"));
const authorization_1 = __importDefault(require("../Middlewares/authorization"));
const transactRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
transactRouter.post("/create", transactAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactData = req.transactData;
    const { sender, receiver } = req.body;
    const dateNow = new Date();
    const dateString = dateNow.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
    try {
        yield prisma.transaction.create({
            data: {
                date: dateString,
                sender: transactData === null || transactData === void 0 ? void 0 : transactData.senderId,
                receiver: transactData === null || transactData === void 0 ? void 0 : transactData.receiverId,
                senderName: sender,
                receiverName: receiver,
                amount: transactData === null || transactData === void 0 ? void 0 : transactData.amount,
            }
        });
        res.json({ message: "transaction created", success: true });
    }
    catch (error) {
        res.json({ message: "Transaction not created", success: false });
    }
}));
transactRouter.get("/getTransactions", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const transactions = yield prisma.transaction.findMany({
            where: { OR: [
                    { sender: userId },
                    { receiver: userId }
                ] }
        });
        res.json({ transactions: transactions, message: "Fetching Successful", success: true });
    }
    catch (error) {
        res.json({ message: "Error in fetching", success: false });
    }
}));
exports.default = transactRouter;
