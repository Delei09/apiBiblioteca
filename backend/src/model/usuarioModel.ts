import UsuarioRepositories from "../respositories/usuarioRespositores"

const usuarioRepositories = new UsuarioRepositories()

export type usuarioType = {
    nome : string ,
    email : string ,
    senha : string ,
    id? : number ,
    idLivro? : number ,
}

export default class UsuarioModel {

    async adicionar(usuario : usuarioType){

        return await usuarioRepositories.adicionar(usuario)
    }

    async atualizar(id : number , usuario : usuarioType){

        return await usuarioRepositories.atualizar(id ,usuario)
    }

    async excluir(id : number){

        return await usuarioRepositories.excluir(id)
    }

    async pegarUmUsuario(id : number){

        return await usuarioRepositories.pegarUmUsuario(id)
    }

    async pegarTodos(){
        return await usuarioRepositories.pegarTodos()
    }

}