import { Request , Response} from 'express'
import TokenModel from './validartoken'

const tokenModel = new TokenModel()

export default class TokenController {

    validar(req : Request , res : Response){
        
        try{
            
            const header = req.headers['authorization']?.split(' ')
            if(header){
                const [_ , token] = header
                const resposta = tokenModel.validar(token)
                res.status(200).json(resposta)
            }else{
                throw 'Erro de requisição'
            }
        }catch(e){
            res.status(400).json(e)
        }
        
    }
}