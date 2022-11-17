import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { AccountsEntity } from 'src/accounts/accounts.entity';
import { TransactionsEntity } from 'src/transactions/transactions.entity';
import { UsersEntity } from 'src/users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: parseInt(configService.get<string>('database.port')),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.dbname'),
        define:{
          timestamps:false
        }
      });
      sequelize.addModels([UsersEntity, AccountsEntity, TransactionsEntity])
      await sequelize.sync()
      return sequelize
    }
  }
]