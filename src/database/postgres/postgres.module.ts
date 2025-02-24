import { Global, Inject, Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATASOURCE, dataSourceProvider } from './data-source';

@Global()
@Module({
  providers: [dataSourceProvider],
  exports: [dataSourceProvider],
})
export class PostgresModule {
  private readonly logger = new Logger(PostgresModule.name);

  constructor(@Inject(DATASOURCE) private datasource: DataSource) {}

  public async onApplicationShutdown(): Promise<void> {
    await this.datasource.destroy();

    this.logger.log(`TypeORM connection destroyed`);
  }
}
