import { Table, Column, DataType, Model, HasOne } from "sequelize-typescript"
import { UsersEntity } from "src/users/users.entity"

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

  @HasOne(() => UsersEntity, { foreignKey: 'id' } )
  users: UsersEntity
}
