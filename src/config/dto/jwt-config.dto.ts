import { IsNotEmpty, IsString } from 'class-validator';

export class JwtConfigDto {
  @IsString()
  @IsNotEmpty()
  readonly accessSecret: string;

  @IsString()
  @IsNotEmpty()
  readonly refreshSecret: string;
}
