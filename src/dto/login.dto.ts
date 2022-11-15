import { IsNotEmpty, MinLength, Matches } from "class-validator" 

export class loginDto {
  @IsNotEmpty()
  @MinLength(3)
  username : string

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*\d)/, { message: 'The password must contain a capital letter, a number and a total length of 8 characters'})
  password : string
}