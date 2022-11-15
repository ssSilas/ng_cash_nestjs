import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Tokengenerate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async generateToken(username: string, host: string) {
    const secretKey: string = this.configService.get<string>('secretKey')

    const duration_token_web: string = this.configService.get<string>('durationToken');//horas : minutos
    let duration: string = duration_token_web;
    let date = Date.now();
    let time = duration.split(':');
    let hours: number = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let oneMinute = 60000;

    let expiration = date + hours * 60 * oneMinute + minutes * oneMinute;

    const objTokengenerate: object = {
      iss: host,
      aud: host,
      exp: parseInt(expiration.toString().slice(0, 10)),
      iat: Math.round(date / 1000),
      nbf: Math.round(date / 1000),
      data: {
        login: username
      }
    }

    return this.jwtService.sign(objTokengenerate, { secret: secretKey, algorithm: 'HS256', })
  }
}