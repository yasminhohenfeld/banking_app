import express, { Application, Request, Response } from "express";
import { createUser, login } from "./control/user";
import { verifyLogin } from "./middleware/verifyLogin";
import { createTransfer, listTransactions } from "./control/transactions";

const route: Application = express();



route.post('/user', createUser);
route.post('/login', login);

route.use(verifyLogin);

route.post('/transfer',createTransfer);
route.get('/transactions', listTransactions);




export { route };
