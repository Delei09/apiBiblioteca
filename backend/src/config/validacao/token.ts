import jwt from 'jsonwebtoken'

export default class TokenModel {

    private palavraSecreta! : string
    constructor(){
         this.palavraSecreta = process.env.PALAVRASECRETA  || 'd'
    }

    validar(token : string) {
        return jwt.verify(token, this.palavraSecreta)
    }

    gerarToken(email : string){

        const acessToken = jwt.sign({email : email} , this.palavraSecreta, {
            expiresIn : '2m'
        })
        const refreshToken = jwt.sign({token : acessToken} , this.palavraSecreta, {
            expiresIn : '5d'
        })

        const token = {acessToken , refreshToken}
        return token
    }
}