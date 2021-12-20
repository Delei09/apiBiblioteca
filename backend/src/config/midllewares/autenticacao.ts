import { NextFunction, Request, Response } from "express";
import { usuarioLogin } from "../../controller/logarController";
import { Usuario } from "../../database/model/usuario";
import ValidarSenha from "../validacao/senha";
import TokenModel from "../validacao/token";


const tokenModel = new TokenModel()
const validarSenha = new ValidarSenha()


export default class autenticacao {

    async validarLogin(req : Request , res : Response , next : NextFunction){

        try{
            const usuario : usuarioLogin = req.body
            const resposta = await  Usuario.findOne({where : {email : usuario.email} , attributes : ['id' , 'senha']})   
            if(!resposta){
                throw 'Email ou Senha incorretos!!!'
            }
            const {id , senha} = resposta?.get()
    
            const eIgual = await validarSenha.compararSenhas(senha ,usuario.senha)
            if(!eIgual){
                throw 'Email ou senha Incorreto'
            }
            next()
        }catch(e){
            res.status(401).json(e)
        }
    }

    async validarToken(req : Request , res : Response , next : NextFunction){

        try{
            
            const header = req.headers['authorization']?.split(' ')
            if(!header){
                throw 'Erro de requisição!!!'
            }

            const [_ , token] = header
            try{
                tokenModel.validar(token)
                next()
            }catch(e){
                throw 'Token Expirado!!!'
            }
                
        }catch(e){
            res.status(400).json(e)
        }
    }



}