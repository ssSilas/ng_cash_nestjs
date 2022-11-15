import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor( 
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
    ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secretKey')
    })
  }

  async validate(payload:any){
    const user = await this.usersService.findOneById(payload.id)
    if (!user) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return payload;
  }
}