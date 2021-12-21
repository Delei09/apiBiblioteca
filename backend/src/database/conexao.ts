import  {  Sequelize  }  from  'sequelize-typescript'
import { Usuario } from './model/usuario'

const  sequelize  =  new  Sequelize ( { 
  database : process.env.DATABASE  , 
  dialect :  'mysql' , 
  username : process.env.USUARIO , 
  password : process.env.PASSWORD ,   
  port : 3306 ,
   host : '192.168.96.2'
} )


sequelize.addModels([Usuario])

export {sequelize}
