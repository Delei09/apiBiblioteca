import UsuarioModel , { usuarioType  } from "../model/usuarioModel"
import { Request , Response} from 'express'
import ValidarSenha from "../config/validacao/senha"
import { Usuario } from "../database/model/usuario"

const validarSenha = new ValidarSenha()
const usuarioModel = new UsuarioModel()

export default class UsuarioController {

    async adicionar(req : Request , res : Response){
        try{
            const usuario : usuarioType = req.body 
            console.log(usuario)
            usuario.senha = await validarSenha.encriptografarSenha(usuario.senha)
            const resposta = await usuarioModel.adicionar(usuario)
            res.status(201).json(resposta)
        }catch(e){
            console.log(e)
            res.status(400).json("Erro no servidor")
        }
        
    }

    async atualizar(req : Request , res : Response){

        try{
            const id = Number(req.params.id)
            if( isNaN(id)){
                throw 'Id de Usuario Incorreto'
            }
            const usuario : usuarioType =  req.body
            
            const resBanco = await  Usuario.findOne({where : {id : id} , attributes : ['senha']})
            const  { senha } = await resBanco?.get()

            const senhaIguais =  await validarSenha.compararSenhas( senha , usuario.senha )
            if(!senhaIguais){
                  throw "Usuario não autorizado"
            }

            usuario.senha = await  validarSenha.encriptografarSenha(usuario.senha)

            const resposta = await usuarioModel.atualizar(id , usuario)
            if(!resposta){
                 throw "Usuario não alterado"
            }
            res.status(200).json('Usuario Alterado')
        }catch(e){
            res.status(400).json(e)
        }
        
    }


    async excluir(req : Request , res : Response){

        try{

            const id = Number(req.params.id)
            if( isNaN(id)){
                throw 'Id de Usuario Incorreto'
            }
           
            const resposta = await usuarioModel.excluir(id)
            if(resposta){
                res.status(200).json("Usuario excluido")
            }else{
                throw "Usuario não encontrado"
            }

        }catch(e){
            res.status(400).json(e)
        }
    }

    async pegarUmUsuario(req : Request , res : Response){
        try{
            const id = Number(req.params.id)
            const resposta = await usuarioModel.pegarUmUsuario(id)
            res.status(200).json(resposta)

        }catch(e){
            res.status(400).json("Erro no servidor")
        }
    }

    async pegarTodos(req : Request , res : Response){
        try{
            const resposta = await usuarioModel.pegarTodos()
            res.status(200).json(resposta)

        }catch(e){
            res.status(400).json("Erro no servidor")
        }
       
    }

}