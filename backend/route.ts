import express, { Application, Request, Response } from "express";
import { createUser, login } from "./control/user";

const route: Application = express();

route.post('/user', createUser);
route.post('/login', login);

export { route };
