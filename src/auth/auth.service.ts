import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { loginDto } from 'src/dto/login.dto';
import { Tokengenerate } from './strategies/token.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenGenerate: Tokengenerate,
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService
  ) { }

  public async create( user: loginDto, host: string ) {
    try {
      // hash the password
      const pass = await this.createHashPassword(user.password);

      const userExist : UsersEntity = await this.usersService.findOneByUsername(user.username)
      if (userExist) throw new HttpException('Username is already used, try another one :)', HttpStatus.BAD_REQUEST)
      
      const createAccount = await this.accountsService.initialCreate()
      // create the user
      const newUser = await this.usersService.create(user.username, pass, createAccount.id);
      // tslint:disable-next-line: no-string-literal
      const { password, ...result } = newUser['dataValues'];

      // generate token
      const token = await this.tokenGenerate.generateToken(user.username, host, newUser.dataValues.id);

      // return the user and the token
      return { user: result, token }; 
    } catch (error) {
      return error
    }
  }

  async login(username: string, host: string) {
    const getUser = await this.usersService.findOneByUsername(username)
    const response = await this.tokenGenerate.generateToken(username, host, getUser.id)
    return { token: response }
  }

  async validateUser(username: string, password: string) {
    let compare: boolean
    let hash = await this.createHashPassword(password)

    try {
      let user = await this.usersService.findOneByUsername(username)

      if (!user) {
        return null;
      }
      compare = hash === user.password;
    } catch (error) {
      return null
    }

    const response: object = {
      username: username
    }

    if (!compare) return null
    return response
  }

  private async createHashPassword(password:string){
    const salt: string = process.env.PASS_SALT;
    const baseHash = String(salt + password)
    const hash = createHash('sha1').update(baseHash).digest('hex')
    
    return hash
  }

//   private async comparePassword(enteredPassword:string, dbPassword:string) {
//     const match = await bcrypt.compare(enteredPassword, dbPassword);
//     return match;
// }

}