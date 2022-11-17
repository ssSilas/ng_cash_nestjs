import { Inject, Injectable } from '@nestjs/common';
import { AccountsEntity } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepo:typeof AccountsEntity,
  ){}

  async initialCreate(){
    return (await this.accountsRepo.create({ balance:100 })).dataValues
  }

  async getBalance(username : string){
    return (await this.accountsRepo.create({ balance:100 })).dataValues
  }
}
