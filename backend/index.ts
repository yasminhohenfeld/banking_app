import express, {Application, Request, Response } from "express";
import { route } from "./route"

const app: Application = express()
const port = 3000;

app.use(express.json());
app.use(route);


app.listen(port, () => {
    console.log("app rodando");
});


