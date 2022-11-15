import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { loginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('add-user')
  async create(@Body() newUser : loginDto, @Req() req:any ) {
    try {
      const { headers } = req
      return await this.authService.create(newUser, headers); 
    } catch (error) {
      return error
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() newUser : loginDto, @Req() req:any ) {
    try {
      const { headers } = req
      return await this.authService.login(newUser.username, headers.host); 
    } catch (error) {
      return error
    }
  }
}
