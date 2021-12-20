import { Table , Column , Model, DataType } from 'sequelize-typescript'

@Table
class Usuario extends Model {

  @Column({
     allowNull : false ,
     primaryKey : true ,
     autoIncrement : true ,
  })
  id! : Number

  @Column({
    allowNull : false ,
    type : DataType.STRING
  })
  nome! : String
  
  @Column({
    allowNull : false ,
    type : DataType.STRING ,
    unique : true 
  })
  email! : String

  @Column({
    allowNull : false ,
    type : DataType.STRING 
  })
  senha! : String

  @Column({
    allowNull : true ,
    type : DataType.STRING(500) ,
    
  })
  refreshToken! : String

}

export {Usuario}