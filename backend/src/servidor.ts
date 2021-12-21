import { app ,  porta } from "./config/config";
import {Usuario} from './database/model/usuario'
import {sequelize}  from './database/conexao' 


app.listen(porta, async () => {
    console.log(`Servidor rodando na porta ${porta}`)

    try{
        await Usuario.sync()
        await  sequelize.sync()
    }catch(e){
        console.log(e)
        
    } 
})