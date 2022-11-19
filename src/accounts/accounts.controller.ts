import { Body, Controller, Get, HttpException, HttpStatus, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
  ) { }

  @Get('/balance')
  @UseGuards(JwtAuthGuard)
  async balance(@Query() query:{ username:string }, @Request() req : {user : any}) {
    try {
      if(query.username != req.user.data.login) 
        throw new UnauthorizedException('You do not have permission to access this balance');
      
      const getBalance = await this.accountsService.getBalance(query.username)
      return `The current balance is: R$${ getBalance.balance }`
    } catch (error) {
      return error
    }
  }

  @Put('/cash-out')
  @UseGuards(JwtAuthGuard)
  async cashOut(@Body() body:{ usernameIn:string, value:number }, @Request() req : any) {
    try {
      const usernameOut = req.user.data.login
      if (usernameOut == body.usernameIn) {
        throw new HttpException('The transaction cannot be performed for yourself :)', HttpStatus.BAD_REQUEST)
      }
      return await this.accountsService.cashOut(usernameOut, body.usernameIn, body.value)
    } catch (error) {
      return error
    }
  }
}
