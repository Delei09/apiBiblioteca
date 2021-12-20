import { usuarioType } from "../model/usuarioModel"
import { Usuario } from "../database/model/usuario"

export default class UsuarioRepositories {

    async adicionar(usuario : usuarioType){
        
        const resposta = await Usuario.create({
            nome : usuario.nome ,
            email : usuario.email ,
            senha : usuario.senha 
        } )
        return resposta
    }

    async atualizar(id : number , usuario : usuarioType){
        const resposta = await Usuario.update( usuario , {
            where : {
                id : id
            }
        })
        return resposta
    }

    async excluir(id : number){

        const resposta = await Usuario.destroy({
            where : {
                id : id
            }
        })
        return resposta
    }

    async pegarUmUsuario(id : number){

        const resposta = await Usuario.findOne({
            where : {
                id : id
            } ,
            attributes : ['id' ,'nome' , 'email']
        })
        return resposta
    }

    async pegarTodos(){
        const resposta = await Usuario.findAll({attributes : ['id' , 'nome' , 'email']})
        return resposta;
    }

}