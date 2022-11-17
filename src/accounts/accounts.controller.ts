import { Controller, Get, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
  ) { }

  @Get('/balance')
  @UseGuards(JwtAuthGuard)
  async findOne(@Query() query:{ username:string }, @Request() req : any) {
    try {
      console.log(req.user.data.login)
      if(query.username != req.user.data.login) throw new UnauthorizedException('You do not have permission to access this balance');
      
      return true 
    } catch (error) {
      return error
    }
  }
}
