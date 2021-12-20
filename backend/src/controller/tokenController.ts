import { Request , Response} from 'express'
import TokenModel from '../config/validacao/token'
import { Usuario } from '../database/model/usuario'


type jwtType = {
    token : string ,
    iat : string ,
    exp : string
}
const tokenModel = new TokenModel()

export default class TokenController {

    validar(req : Request , res : Response){
        res.status(200).json("Token OK")
    }

    async atualizar(req : Request , res : Response){
        try{

            const { email , refreshToken } = req.body
            try{
                const usuario = await Usuario.findOne({
                    where : {
                        email : email
                    },
                    attributes : ['email' , 'refreshToken']
                })

                if(usuario?.refreshToken !== refreshToken){
                    throw 'Token Invalido'
                }                

                const token = tokenModel.gerarToken(email)
                await Usuario.update({refreshToken : token.refreshToken} , {
                    where : {
                        email : email
                    }
                })

                res.status(200).json(token)
            }catch(e){
                console.log(e)
                throw 'token invalido!'
            }
        }catch(e){
            res.status(400).json(e)
        }
    }

}

