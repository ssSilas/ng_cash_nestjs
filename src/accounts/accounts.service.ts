import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersEntity } from 'src/users/users.entity';
import { AccountsEntity } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepo:typeof AccountsEntity,

    @Inject('USERS_REPOSITORY')
    private usersRepo:typeof UsersEntity,

    private readonly transactionsService : TransactionsService
  ){}

  async initialCreate(){
    return (await this.accountsRepo.create({ balance:100 })).dataValues
  }

  async getBalance(username : string){
    const balance = await this.usersRepo.findOne({
      where: { username },
      include:{ model: AccountsEntity }
    })
    return balance.dataValues.account
  }

  async cashOut( cashOut : string, cashIn : string, value : number ){
    const balanceOut = await this.getBalance(cashOut)
    const balanceIn = await this.getBalance(cashIn)

    if (balanceOut.balance < value) 
      throw new HttpException(
        `Insufficient balance for transaction. Your balance is: ${balanceOut}`, 
        HttpStatus.BAD_REQUEST
      )

    const subtract = balanceIn.balance + value
    const sum = balanceOut.balance - value

    const updateOut = await this.updateAccount(balanceOut.id, subtract)
    const updateIn = await this.updateAccount(balanceIn.id, sum)

    const transactionOut = await this.transactionsService.addTransaction('out', balanceIn.id, sum)
    const transactionIn = await this.transactionsService.addTransaction('in', balanceOut.id, subtract)

    return {
      out: transactionOut,
      in: transactionIn
    }
    
  }

  async updateAccount(id : number, value : number){
    const update = await this.accountsRepo.update(
      { balance: value },
      { where:{ id } }
    )
    return update
  }
}
