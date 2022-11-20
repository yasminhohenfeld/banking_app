import express, { Application, Request, Response } from "express";
import { createUser } from "./control/user";

const route: Application = express();

route.post('/user', createUser);

export { route };
