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
const validation_1 = __importDefault(require("../Middlewares/validation"));
const authorization_1 = __importDefault(require("../Middlewares/authorization"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", validation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email: email }
        });
        if (user) {
            res.json({ message: "email already registered", success: false });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 5);
            const { id } = yield prisma.user.create({
                data: { username, password: hashedPassword, email },
            });
            yield prisma.account.create({
                data: {
                    userId: id,
                    amount: 100
                }
            });
            res.json({ message: "User Created", success: true });
        }
    }
    catch (error) {
        res.json({ message: "Task Failed", success: false });
    }
}));
userRouter.post("/signin", validation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email: email },
        });
        if (user) {
            const hashedPassword = user.password;
            const passwordCheck = yield bcryptjs_1.default.compare(password, hashedPassword);
            if (passwordCheck) {
                const token = jsonwebtoken_1.default.sign(user.id.toString(), process.env.JWT_SECRET);
                res.json({
                    token: token,
                    message: "Sign-in Successful",
                    success: true,
                });
            }
            else {
                res.json({ message: "Incorrect password", success: false });
            }
        }
        else {
            res.json({ message: "No user found. Sign-up first", success: false });
        }
    }
    catch (error) {
        res.json({ message: "error", success: false });
    }
}));
userRouter.get("/list", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        res.json({ usersList: allUsers, message: "fetching done", success: true });
    }
    catch (error) {
        res.json({ message: "fetching failed", success: false });
    }
}));
userRouter.post("/sendMoney", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { sendTo, amount } = req.body;
    try {
        const accFrom = yield prisma.account.findFirst({
            where: { userId: userId },
        });
        const accTo = yield prisma.account.findFirst({
            where: { userId: sendTo },
        });
        const transactString = {
            senderId: accFrom === null || accFrom === void 0 ? void 0 : accFrom.userId,
            receiverId: accTo === null || accTo === void 0 ? void 0 : accTo.userId,
            amount: amount
        };
        if (accTo && accFrom && accFrom.amount >= amount) {
            yield prisma.$transaction([
                prisma.account.update({
                    where: { id: accFrom.id },
                    data: { amount: { decrement: amount } },
                }),
                prisma.account.update({
                    where: { id: accTo.id },
                    data: { amount: { increment: amount } },
                }),
            ]);
            const transactToken = jsonwebtoken_1.default.sign(JSON.stringify(transactString), process.env.JWT_TRANSACT_SECRET);
            res.json({ message: "transaction successfull", success: true, transactToken: transactToken });
        }
        else {
            res.json({ message: "Transaction Failed. Check Account", success: false });
        }
    }
    catch (error) {
        res.json({ message: "Something went wrong!", success: false });
    }
}));
userRouter.get("/getuser", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId }
        });
        res.json({
            user: user, message: "User Found", success: true
        });
    }
    catch (error) {
        res.json({ message: "something went wrong", success: false });
    }
}));
exports.default = userRouter;
