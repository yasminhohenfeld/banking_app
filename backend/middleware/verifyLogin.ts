import { verify } from 'jsonwebtoken';
import { db } from "../database";
import { Request, Response, NextFunction } from "express";

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {   

    const { authorization } = req.headers;

    if (!authorization){
        return res.status(401).send("Não autorizado")
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const {id }: any = verify(token, "123");

        const username = await db('users').where({ id }).first()

        if (!username) {
            return res.status(404).send("Usuário não encontrado");
        }


    } catch (e){
        return res.status(500).send(`msg: ${e}`)

    }
   
    next();

}


export {verifyLogin}
