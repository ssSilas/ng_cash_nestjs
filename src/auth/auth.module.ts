import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/users/users.module';
import { Tokengenerate } from './strategies/token.service';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports:[
    JwtModule.register({}),
    PassportModule,
    UsersModule,
    AccountsModule
  ], 
  controllers: [AuthController],
  providers: [AuthService, Tokengenerate, LocalStrategy, JwtStrategy],
  exports: [AuthService, Tokengenerate]
})
export class AuthModule {}
