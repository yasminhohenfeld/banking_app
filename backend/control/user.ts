import { Request, Response } from "express";
import { userSchemas } from "../validations/userSchemas";
import { loginSchemas } from "../validations/loginSchemas";
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import { db } from "../database";



const createUser  = async (req: Request, res: Response): Promise<Response> => {

    const { name, password } = req.body

    try {     
        await userSchemas.validate(req.body);

        const regexHasNumber = /[0-9]/;
        const hasNumber = regexHasNumber.test(password);

        if (hasNumber === false){
            return res.status(400).send({msg: "A senha precisa contar pelo menos um número"})
        }

        const regexHasLetter = /[a-z]/
        const hasLetter = regexHasLetter.test(password.toLowerCase())

        if ((hasLetter === false) || (password === password.toLowerCase())){
            return res.status(400).send({msg: "A senha precisa conter letras e pelo menos uma letra maíuscula"})
        }

        const passwordEncrypted = await bcrypt.hash(password, 10); 
        
        const username = await db('users').where('username', name);

        if (username.length > 0){
            return res.status(400).send({msg: "Já existe um usuário cadastrado com este nome"})
        }

        const accounts = await db("accounts").insert({balance: 100}).returning("id")

        const data = {
            username: name,
            password: passwordEncrypted,
            accountid: accounts[0].id
        }

        const users = await db("users").insert(data).returning("id")
        return res.status(200).send({msg: "Usuário cadastrado com sucesso!"})
 
    } catch (e) {
        return res.status(500).send(`msg: ${e}`)
    }
    
}

const login  = async (req: Request, res: Response): Promise<Response> => {

    const {name, password} = req.body

    try{
        await loginSchemas.validate(req.body);

        const user = await db('users').where('username', name).first();

        if (user === undefined){
            return res.status(400).send("Usuário não encontrado. Insira um nome e uma senha válida")
        }
        
        const isVerfied = await bcrypt.compare(password, user.password)
        
        if (isVerfied === false){
            return res.status(400).send("Senha incorreta")
        }

        const token = await jsonwebtoken.sign({id: user.id}, "123", {expiresIn: '24h'})
        
        const account = await db('accounts').where('id', user.accountid);
        console.log (account)

        return res.status(200).send({msg: `Bem-vindo ${name}, informações da sua conta:`,
        idUsuário: user.id,
        name: user.username,
        idConta: account[0].id,
        saldo: account[0].balance,
        token: token})
    } catch (e) {
        return res.status(500).send(`msg: ${e}`)
    }
}



export {
    createUser,
    login

}