import { Table, Column, DataType, Model} from "sequelize-typescript"
import dayjs from "dayjs"

@Table({tableName:'transactions'})
export class TransactionsEntity extends Model<TransactionsEntity> {
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
  value: number

  @Column({
    allowNull:false,
    type:DataType.DATE
  })
  createdAt: string = dayjs().format('YYYY-MM-DD HH:mm:ss')
}
