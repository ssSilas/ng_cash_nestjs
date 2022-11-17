import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { accountsProviders } from './accounts.providers';
import { UsersModule } from 'src/users/users.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TransactionsService } from 'src/transactions/transactions.service';
import { transactionsProviders } from 'src/transactions/transaction.providers';

@Module({
  imports:[
    UsersModule,
    TransactionsModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService, ...accountsProviders, TransactionsService, ...transactionsProviders],
  exports:[
    AccountsService, ...accountsProviders
  ]
})
export class AccountsModule {}
