import { Table, Column, DataType, Model} from "sequelize-typescript"

@Table({tableName:'users'})
export class UsersEntity extends Model<UsersEntity> {
  @Column({
    autoIncrement:true,
    primaryKey:true,
    type:DataType.INTEGER
  })
  id:number

  @Column({
    allowNull:false,
    unique:true,
    type:DataType.STRING
  })
  username: string

  @Column({
    allowNull:false,
    type : DataType.STRING
  })
  password: string

  @Column({
    allowNull:false,
    type:DataType.INTEGER
  })
  accountfk: number
}
