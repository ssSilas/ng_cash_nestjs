import { Table, Column, DataType, Model} from "sequelize-typescript"

@Table({tableName:'transactions'})
export class Transactions extends Model<Transactions> {
  @Column({
    autoIncrement:true,
    primaryKey:true,
    type:DataType.INTEGER
  })
  id:number

  @Column({
    allowNull:true,
    type:DataType.INTEGER
  })
  debitedAccountId: number

  @Column({
    allowNull:true,
    type:DataType.INTEGER
  })
  creditedAccountId: number

  @Column({
    allowNull:false,
    type : DataType.INTEGER
  })
  value: string

  @Column({
    allowNull:false,
    type:DataType.DATE
  })
  createdAt: Date
}
