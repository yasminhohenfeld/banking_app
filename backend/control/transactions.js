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
exports.listTransactions = exports.createTransfer = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const transferSchemas_1 = require("../validations/transferSchemas");
const database_1 = require("../database");
const createTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send("Não autorizado!");
    }
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = (0, jsonwebtoken_1.verify)(token, "123");
    const username = yield (0, database_1.db)('users').where({ id }).first();
    const { creditedAccountId, value } = req.body;
    const debitedAccountId = parseInt(username.accountid);
    try {
        yield transferSchemas_1.transferSchemas.validate(req.body);
        if (creditedAccountId === (debitedAccountId)) {
            return res.status(400).send("Não é possível fazer transferência para a conta do próprio usuário logado!");
        }
        const account = yield (0, database_1.db)('accounts').where('id', creditedAccountId).first();
        if (account === undefined) {
            return res.status(400).send("Conta de usuário não encontrada, insira um id válido para transferir.");
        }
        const accountUser = yield (0, database_1.db)('accounts').where('id', debitedAccountId).first();
        if (value > accountUser.balance) {
            return res.status(400).send("Saldo insuficiente para transferência.");
        }
        const currentUserBalance = accountUser.balance - value;
        const currentBalance = account.balance + value;
        yield (0, database_1.db)('accounts').where({ id: debitedAccountId }).update({ balance: currentUserBalance });
        yield (0, database_1.db)('accounts').where({ id: creditedAccountId }).update({ balance: currentBalance });
        const transaction = {
            debitedaccountid: debitedAccountId,
            creditedaccountid: creditedAccountId,
            value: value,
            createdat: new Date(Date.now())
        };
        yield (0, database_1.db)('transactions').insert(transaction);
        return res.status(200).send("Transação concluida com sucesso!");
    }
    catch (e) {
        return res.status(500).send(`msg: ${e}`);
    }
});
exports.createTransfer = createTransfer;
function isVailidStringDate(date) {
    return (new Date(date)).toString() !== 'Invalid Date';
}
const listTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send("Não autorizado!");
    }
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = (0, jsonwebtoken_1.verify)(token, "123");
    const username = yield (0, database_1.db)('users').where({ id }).first();
    try {
        let transactions = yield (0, database_1.db)('transactions').where({ debitedaccountid: username.accountid }).orWhere({ creditedaccountid: username.accountid });
        if ((req.query.cashout !== undefined) && (req.query.cashout !== null) && (req.query.cashout === 'false')) {
            transactions = transactions.filter(transaction => transaction.debitedaccountid === parseInt(username.accountid));
        }
        if ((req.query.cashin !== undefined) && (req.query.cashin !== null) && (req.query.cashin === 'false')) {
            transactions = transactions.filter(transaction => transaction.creditedaccountid === parseInt(username.accountid));
        }
        const data = req.query.data;
        if ((req.query.data !== undefined) && (req.query.data !== undefined) && (isVailidStringDate(data) === false)) {
            transactions = transactions.filter(transaction => transaction.createdat === new Date(data));
        }
        return res.status(200).send(transactions);
    }
    catch (e) {
        return res.status(500).send(`msg: ${e}`);
    }
});
exports.listTransactions = listTransactions;
