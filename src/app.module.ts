import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config/config';
import { databaseProviders } from 'config/database.providers';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables:true,
      isGlobal:true,
      load:[config]
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    TransactionsModule
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports:[...databaseProviders]
})
export class AppModule {}