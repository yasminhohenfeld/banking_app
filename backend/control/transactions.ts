import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { transferSchemas } from "../validations/transferSchemas";
import { db } from "../database";
import { verifyLogin } from '../middleware/verifyLogin'



const createTransfer = async (req: Request, res: Response): Promise<Response> => {  

    const { authorization } = req.headers;
    if (!authorization){
        return res.send("Não autorizado!")
    }
    const token = authorization.replace('Bearer ', '').trim();
    const {id }: any = verify(token, "123");
    const username = await db('users').where({ id }).first()

    const { creditedAccountId, value } = req.body
    const debitedAccountId = parseInt(username.accountid)

    try { 
        await transferSchemas.validate(req.body);

        if (creditedAccountId === (debitedAccountId)){
            return res.status(400).send ("Não é possível fazer transferência para a conta do próprio usuário logado!")
        }
        

        const account = await db('accounts').where('id', creditedAccountId).first();

        if (account === undefined){
            return res.status(400).send("Conta de usuário não encontrada, insira um id válido para transferir.")
        }
        
        const accountUser = await db('accounts').where('id', debitedAccountId).first();

        if (value > accountUser.balance){
            return res.status(400).send("Saldo insuficiente para transferência.")
        }

        const currentUserBalance = accountUser.balance - value;
        const currentBalance = account.balance + value;


        await db('accounts').where({id: debitedAccountId }).update({balance: currentUserBalance});
        await db('accounts').where({id: creditedAccountId}).update({balance: currentBalance});

        const transaction = {
            debitedaccountid: debitedAccountId,
            creditedaccountid: creditedAccountId,
            value: value,
            createdat: new Date(Date.now())
        }

        await db('transactions').insert(transaction);

        
        return res.status(200).send("Transação concluida com sucesso!")
        
    } catch (e){
        return res.status(500).send(`msg: ${e}`)
    }

}


const listTransfer = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send("Ok")
}

export {
    createTransfer,
    listTransfer,
    
}

