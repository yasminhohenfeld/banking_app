import { Request, Response } from "express";
import { userSchemas } from "../validations/userSchemas";
import * as bcrypt from 'bcrypt'



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






        return res.status(200).send({ msg: "Usuario"})  
    } catch (e) {
        return res.status(500).send(`msg: ${e}`)
    }
    


}



export {
    createUser
}