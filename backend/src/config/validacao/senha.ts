import bcrypt from 'bcrypt'

export default class ValidarSenha{

    async encriptografarSenha(senha : string) : Promise<string>{

        const saltRounds = 10;
        const senhaCriptografada = bcrypt.hashSync(senha , saltRounds)
        return senhaCriptografada
    }

    async compararSenhas(senhaBanco : string , senhaUsuario : string) : Promise<boolean> {
       
        const resposta =  bcrypt.compareSync(senhaUsuario , senhaBanco)
        return resposta

    }
}