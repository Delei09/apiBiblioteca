import express , {Request , Response} from 'express'
import UsuarioController from './controller/usuarioController'
import LoginController from './controller/logarController'
import TokenController from './controller/tokenController'

const loginController = new LoginController()
const usuarioController = new UsuarioController()
const tokenController = new TokenController()

const Rotas = express.Router()

Rotas.post('/usuario' , (req : Request , res : Response ) => {
    usuarioController.adicionar(req , res)
})

Rotas.post('/login' , (req : Request , res : Response ) => {
    loginController.login(req , res)
})

Rotas.put('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.atualizar(req , res)
})


Rotas.get('/usuarios' , (req : Request , res : Response ) => {
    usuarioController.pegarTodos(req , res)
})

Rotas.get('/token' , (req : Request , res : Response ) => {
    tokenController.validar(req , res)
})


Rotas.get('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.pegarUmUsuario(req , res)
})


Rotas.delete('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.excluir(req , res)
})


export default Rotas