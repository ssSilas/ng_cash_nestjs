import { Inject, Injectable } from '@nestjs/common';
import { TransactionsEntity } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepo: typeof TransactionsEntity
  ){ }

  async addTransaction(type : string, idAccount : number, value: number){
    return await this.transactionsRepo.create({
      debitedAccountId: type != 'in' ? idAccount : null,
      creditedAccountId: type == 'in' ? idAccount : null,
      value
    })
  }
}
