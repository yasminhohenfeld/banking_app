import { Request, Response } from "express";

const createUser  = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ msg: "Usuario"})
}



export {
    createUser
}