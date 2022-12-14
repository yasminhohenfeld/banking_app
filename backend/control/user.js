"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.createUser = void 0;
const userSchemas_1 = require("../validations/userSchemas");
const loginSchemas_1 = require("../validations/loginSchemas");
const jsonwebtoken = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const database_1 = require("../database");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        yield userSchemas_1.userSchemas.validate(req.body);
        const regexHasNumber = /[0-9]/;
        const hasNumber = regexHasNumber.test(password);
        if (hasNumber === false) {
            return res.status(400).send({ msg: "A senha precisa contar pelo menos um n??mero" });
        }
        const regexHasLetter = /[a-z]/;
        const hasLetter = regexHasLetter.test(password.toLowerCase());
        if ((hasLetter === false) || (password === password.toLowerCase())) {
            return res.status(400).send({ msg: "A senha precisa conter letras e pelo menos uma letra ma??uscula" });
        }
        const passwordEncrypted = yield bcrypt.hash(password, 10);
        const username = yield (0, database_1.db)('users').where('username', name);
        if (username.length > 0) {
            return res.status(400).send({ msg: "J?? existe um usu??rio cadastrado com este nome" });
        }
        const accounts = yield (0, database_1.db)("accounts").insert({ balance: 100 }).returning("id");
        const data = {
            username: name,
            password: passwordEncrypted,
            accountid: accounts[0].id
        };
        const users = yield (0, database_1.db)("users").insert(data).returning("id");
        return res.status(200).send({ msg: "Usu??rio cadastrado com sucesso!" });
    }
    catch (e) {
        return res.status(500).send(`msg: ${e}`);
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        yield loginSchemas_1.loginSchemas.validate(req.body);
        const user = yield (0, database_1.db)('users').where('username', name).first();
        if (user === undefined) {
            return res.status(400).send("Usu??rio n??o encontrado. Insira um nome e uma senha v??lida");
        }
        const isVerfied = yield bcrypt.compare(password, user.password);
        if (isVerfied === false) {
            return res.status(400).send("Senha incorreta");
        }
        const token = yield jsonwebtoken.sign({ id: user.id }, "123", { expiresIn: '24h' });
        const account = yield (0, database_1.db)('accounts').where('id', user.accountid);
        return res.status(200).send({ msg: `Bem-vindo ${name}, informa????es da sua conta:`,
            idUsu??rio: user.id,
            name: user.username,
            idConta: account[0].id,
            saldo: account[0].balance,
            token: token });
    }
    catch (e) {
        return res.status(500).send(`msg: ${e}`);
    }
});
exports.login = login;
