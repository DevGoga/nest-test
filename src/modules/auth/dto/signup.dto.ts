import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH } from '../../../app.constants';

export class SignupDto {
  @IsEmail()
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @ApiProperty()
  password: string;
}
