import  {  Sequelize  }  from  'sequelize-typescript'
import { Usuario } from './model/usuario'


console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)
console.log(process.env.USUARIO)



const  sequelize  =  new  Sequelize ( { 
  database : process.env.DATABASE  , 
  dialect :  'mysql' , 
  username : process.env.USUARIO , 
  password : process.env.PASSWORD ,   
} )


sequelize.addModels([Usuario])

export {sequelize}
