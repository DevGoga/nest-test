import { Type } from 'class-transformer';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { NestedConfigDto } from '../../decorators';
import { PostgresConfigDto } from './postgres-config.dto';

export class AppConfigDto {
  @IsInt()
  @Min(1024)
  @Max(65535)
  @Type(() => Number)
  readonly port: number;

  @NestedConfigDto(PostgresConfigDto)
  readonly postgres: PostgresConfigDto;

  @IsString()
  readonly redisConnectionString: string;
}
