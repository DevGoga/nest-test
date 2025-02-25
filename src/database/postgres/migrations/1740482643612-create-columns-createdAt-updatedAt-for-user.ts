import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Columns, Tables } from '../postgres.constants';

export class CreateColumnsCreatedAtUpdatedAtForUser1740482643612 implements MigrationInterface {
  private readonly table = [
    new TableColumn({
      name: Columns.createdAt,
      type: 'timestamp',
      default: 'now()',
    }),
    new TableColumn({
      name: Columns.updatedAt,
      type: 'timestamp',
      default: 'now()',
    }),
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(Tables.users, this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(Tables.users, this.table);
  }
}
