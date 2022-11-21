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
exports.verifyLogin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../database");
const verifyLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("Não autorizado");
    }
    try {
        const token = authorization.replace('Bearer ', '').trim();
        const { id } = (0, jsonwebtoken_1.verify)(token, "123");
        const username = yield (0, database_1.db)('users').where({ id }).first();
        if (!username) {
            return res.status(404).send("Usuário não encontrado");
        }
    }
    catch (e) {
        return res.status(500).send(`msg: ${e}`);
    }
    next();
});
exports.verifyLogin = verifyLogin;
