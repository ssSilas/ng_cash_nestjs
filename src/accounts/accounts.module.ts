import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { accountsProviders } from './accounts.providers';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, ...accountsProviders],
  exports:[
    AccountsService, ...accountsProviders
  ]
})
export class AccountsModule {}
