import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, Max, Min } from 'class-validator';
import { NestedConfigDto } from '../../decorators';
import { JwtConfigDto } from './jwt-config.dto';
import { PostgresConfigDto } from './postgres-config.dto';

export class AppConfigDto {
  @IsInt()
  @Min(1024)
  @Max(65535)
  @Type(() => Number)
  readonly port: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly passwordRound: number;

  @NestedConfigDto(JwtConfigDto)
  readonly jwt: JwtConfigDto;

  @NestedConfigDto(PostgresConfigDto)
  readonly postgres: PostgresConfigDto;

  @IsString()
  readonly redisConnectionString: string;
}
