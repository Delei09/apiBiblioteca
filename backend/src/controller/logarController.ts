import { Request , Response } from 'express'
import TokenModel from "../config/validacao/token";
import { Usuario } from '../database/model/usuario';


const tokenModel = new TokenModel()

export type usuarioLogin = {
    email : string ,
    senha : string
}

export default class LoginController {

    async login(req : Request , res : Response){

        try{
            const usuario : usuarioLogin = req.body
            const token = tokenModel.gerarToken(usuario.email)
            const  {refreshToken } = token

            Usuario.update({ refreshToken : refreshToken} , {
                where : {
                    email : usuario.email
                } 
            }).then(resposta => {
                res.status(200).json(token)
            }).catch(e => {
                throw 'Erro Banco de Dados'
            })
        }catch(e){
            res.status(400).json(e)
        }
   }
}