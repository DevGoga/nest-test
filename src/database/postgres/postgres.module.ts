import { Global, Inject, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { POSTGRES } from './postgres.constants';
import { postgresProvider } from './postgres.provider';

@Global()
@Module({
  providers: [postgresProvider],
  exports: [postgresProvider],
})
export class PostgresModule implements OnApplicationShutdown {
  private readonly logger = new Logger(PostgresModule.name);

  constructor(@Inject(POSTGRES) private datasource: DataSource) {}

  public async onApplicationShutdown(): Promise<void> {
    await this.datasource.destroy();

    this.logger.log(`TypeORM connection destroyed`);
  }
}
