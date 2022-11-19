import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { TransactionsEntity } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepo: typeof TransactionsEntity,

    private readonly usersService: UsersService
  ) { }

  async addTransaction(type: string, idAccount: number, value: number) {
    try {
      return await this.transactionsRepo.create({
        debitedAccountId: type != 'in' ? idAccount : null,
        creditedAccountId: type == 'in' ? idAccount : null,
        value
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getTransaction(username: string) {
    try {
      const getUsers = await this.usersService.findOneByUsername(username)
      const getTransactions = await this.transactionsRepo.findAll({
        where: {
          [Op.or]: {
            debitedAccountId: getUsers.account.id,
            creditedAccountId: getUsers.account.id
          }
        }
      })
      if (!getTransactions.length)
        throw new UnauthorizedException('You do not have transaction');

      return getTransactions
    } catch (error) {
      return error
    }
  }

  async filterTransaction(username: string, type: string) {
    try {
      const getUsers = await this.usersService.findOneByUsername(username)

      const data = ['debitedAccountId', 'creditedAccountId']
      const param = type == 'cash-in' ? data[1] : data[0]

      const getTransactions = await this.transactionsRepo.findAll({
        where: { [param]: getUsers.account.id }
      })
      if (!getTransactions.length)
        throw new UnauthorizedException('You do not have transaction');

      return getTransactions
    } catch (error) {
      return error
    }
  }

  async filterTransactionDate(username: string, date: Date) {
    try {
      const getUsers = await this.usersService.findOneByUsername(username)
      const getTransactions = await this.transactionsRepo.findAll({
        where: {
          [Op.or]: {
            debitedAccountId: getUsers.account.id,
            creditedAccountId: getUsers.account.id
          },
          createdAt: date
        }
      })
      if (!getTransactions.length)
        throw new UnauthorizedException('You do not have transaction');

      return getTransactions
    } catch (error) {
      return error
    }
  }
}
