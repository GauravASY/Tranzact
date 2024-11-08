"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const transactRouter_1 = __importDefault(require("./Routes/transactRouter"));
const accountRouter_1 = __importDefault(require("./Routes/accountRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/transaction", transactRouter_1.default);
app.use("/api/v1/account", accountRouter_1.default);
app.listen(3000, () => console.log("Server listening on 3000"));
