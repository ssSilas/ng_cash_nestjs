import { Table, Column, DataType, Model} from "sequelize-typescript"

@Table({ tableName:'accounts' })

export class AccountsEntity extends Model<AccountsEntity> {
  @Column({
    autoIncrement:true,
    primaryKey:true,
    type:DataType.INTEGER
  })
  id : number

  @Column({
    allowNull:false,
    unique:true,
    type:DataType.INTEGER
  })
  balance : number
}
