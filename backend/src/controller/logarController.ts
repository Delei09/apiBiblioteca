import ValidarSenha from "./validarSenha";
import {Usuario} from '../database/model/usuario'
import { Request , Response } from 'express'
import jwt from 'jsonwebtoken'
import TokenModel from "./validartoken";


const tokenModel = new TokenModel()
const validarSenha = new ValidarSenha()

export type usuarioLogin = {
    email : string ,
    senha : string
}

export default class LoginController {

    async login(req : Request , res : Response){

        try{
            const usuario : usuarioLogin = req.body

            const resposta = await  Usuario.findOne({where : {email : usuario.email} , attributes : ['id' , 'senha']})
            const {id , senha} = resposta?.get()

            const eIgual = await validarSenha.compararSenhas(senha ,usuario.senha)
            if(!eIgual){
                throw 'Email ou senha Incorreto'
            }

            const token = tokenModel.gerarToken(usuario.email)
            res.status(200).json(token)
        }catch(e){
            res.status(400).json(e)
        }
   }
}