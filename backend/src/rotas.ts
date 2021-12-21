import express , {Request , Response} from 'express'
import UsuarioController from './controller/usuarioController'
import LoginController from './controller/logarController'
import TokenController from './controller/tokenController'
import Autenticacao from './config/midllewares/autenticacao'
import Formulario from './config/midllewares/formulario'

const formularioMidlleware = new Formulario()
const autenticacao = new Autenticacao() 
const loginController = new LoginController()
const usuarioController = new UsuarioController()
const tokenController = new TokenController()

const Rotas = express.Router()


Rotas.post('/usuario' , formularioMidlleware.cadastro , formularioMidlleware.emailExiste , (req : Request , res : Response ) => {
    usuarioController.adicionar(req , res)
})

Rotas.post('/login' , autenticacao.validarLogin , (req : Request , res : Response ) => {
    loginController.login(req , res)
})

Rotas.post('/atualizartoken' , (req : Request , res : Response ) => {
    tokenController.atualizar(req , res)
})

Rotas.put('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.atualizar(req , res)
})


Rotas.get('/usuarios' , (req : Request , res : Response ) => {
    usuarioController.pegarTodos(req , res)
})

Rotas.get('/validartoken' , autenticacao.validarToken , (req : Request , res : Response ) => {
    tokenController.validar(req , res)
})


Rotas.get('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.pegarUmUsuario(req , res)
})


Rotas.delete('/usuario/:id' , (req : Request , res : Response ) => {
    usuarioController.excluir(req , res)
})


export default Rotas