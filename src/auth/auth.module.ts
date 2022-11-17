import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/users/users.module';
import { Tokengenerate } from './strategies/token.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      // signOptions: {expiresIn: '24h'},
    }),
    PassportModule,
    UsersModule,
    AccountsModule
  ], 
  controllers: [AuthController],
  providers: [AuthService, Tokengenerate, LocalStrategy, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, Tokengenerate]
})
export class AuthModule {}
