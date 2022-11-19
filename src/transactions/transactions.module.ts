import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { transactionsProviders } from './transaction.providers';
import { usersProviders } from 'src/users/users.providers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    UsersModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, ...transactionsProviders, ...usersProviders]
})
export class TransactionsModule {}
