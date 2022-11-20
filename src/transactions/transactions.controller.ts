import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTransactions(@Request() req : any) {
    try {
      return await this.transactionsService.getTransaction(req.user.data.login)
    } catch (error) {
      return error
    }
  }

  @Get('/filter')
  @UseGuards(JwtAuthGuard)
  async filterTransactions(@Request() req : any, @Query() query:{type:string}) {
    try {
      return await this.transactionsService.filterTransaction(req.user.data.login, query.type)
    } catch (error) {
      return error
    }
  }

  @Get('/filter-date')
  @UseGuards(JwtAuthGuard)
  async filterTransactionsDate(@Request() req : any, @Query() query:{date:Date}) {
    try {
      return await this.transactionsService.filterTransactionDate(req.user.data.login, query.date)
    } catch (error) {
      return error
    }
  }
}
