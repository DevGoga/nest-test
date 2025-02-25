import { ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { config as parseEnvFile } from 'dotenv';
import { AppConfigDto } from './dto';

parseEnvFile();

export type EnvStructure<T = any> = {
  [key in keyof T]: T[key] extends object ? EnvStructure<T[key]> : string | undefined;
};

const envValues: EnvStructure<AppConfigDto> = {
  port: process.env.PORT,
  passwordRound: process.env.PASSWORD_ROUNDS,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  redisConnectionString: process.env.REDIS_CONNECTION,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};

const appConfig: AppConfigDto = plainToInstance(AppConfigDto, envValues);

const errors: ValidationError[] = validateSync(appConfig);

if (errors.length) {
  console.error('Config validation error');

  errors.forEach((error: ValidationError) => {
    console.error(error.toString());
  });

  console.warn('Process will now exit');
  process.exit(1);
}

export default appConfig;
