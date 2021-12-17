import jwt from 'jsonwebtoken'

export default class TokenModel {

    private palavraSecreta! : string
    constructor(){
         this.palavraSecreta = process.env.PALAVRA_SECRETA || ''
    }

    validar(token : string) {
        return jwt.verify(token, this.palavraSecreta)
    }

    gerarToken(email : string){
        const token = jwt.sign({email : email} , this.palavraSecreta, {
            expiresIn : '1m'
        })
        return token
    }
}