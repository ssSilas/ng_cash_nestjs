import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { transactionsProviders } from './transaction.providers';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ...transactionsProviders]
})
export class TransactionsModule {}
