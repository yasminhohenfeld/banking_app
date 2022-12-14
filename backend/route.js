"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./control/user");
const verifyLogin_1 = require("./middleware/verifyLogin");
const transactions_1 = require("./control/transactions");
const route = (0, express_1.default)();
exports.route = route;
route.post('/user', user_1.createUser);
route.post('/login', user_1.login);
route.use(verifyLogin_1.verifyLogin);
route.post('/transfer', transactions_1.createTransfer);
route.get('/transactions', transactions_1.listTransactions);
