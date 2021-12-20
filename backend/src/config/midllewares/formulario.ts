import { NextFunction, Request , Response } from "express";
import {Usuario} from '../../database/model/usuario'

type cadastroType = {
    nome : string ,
    email : string ,
    senha : string
}

export default class Formulario {

    cadastro(req : Request , res : Response , next : NextFunction){

        try{

            const cadastro : cadastroType = req.body
    
            if(cadastro.nome.length === 0){
               throw "Preencha um nome valido"
            }
    
            if( !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(cadastro.email) ){
               throw "Preencha o email corretamente"
            }
    
            if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(cadastro.senha)){
               throw "Digite uma senha que contenha ao menos 1 número, '1 caracter especial, 1 letra maiuscula e seja maior que 8 digitos"
            }
    
            next()
        }catch(e){
            res.status(400).json(e)
        }

    }

    async emailExiste(req : Request , res : Response , next : NextFunction){

        try{
            
            const cadastro : cadastroType = req.body
            const usuario = await Usuario.findOne({where : {email : cadastro.email}})
            if(usuario){
                throw 'Email já cadastrado'
            }
            next()

        }catch(e){
            res.status(400).json(e)
        }


    }

} 