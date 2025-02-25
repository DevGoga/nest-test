import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Columns, Tables } from '../postgres.constants';

export class CreateArticleTable1740481290176 implements MigrationInterface {
  private readonly table = new Table({
    name: Tables.articles,
    columns: [
      {
        name: Columns.id,
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: Columns.title,
        type: 'varchar',
        length: '255',
      },
      {
        name: Columns.description,
        type: 'varchar',
        length: '255',
      },
      {
        name: Columns.dateOfPublication,
        type: 'timestamp',
      },
      {
        name: Columns.createdAt,
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: Columns.updatedAt,
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
