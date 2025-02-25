import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { Columns, Tables } from '../postgres.constants';

export class CreateForeignKeyColumnAuthorId1740504780078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(Tables.articles, [new TableColumn({ name: Columns.authorId, type: 'integer' })]);

    await queryRunner.createForeignKey(
      Tables.articles,
      new TableForeignKey({
        columnNames: [Columns.authorId],
        referencedTableName: Tables.users,
        referencedColumnNames: [Columns.id],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(Tables.articles, 'authorId');

    await queryRunner.dropColumns(Tables.articles, [new TableColumn({ name: Columns.authorId, type: 'integer' })]);
  }
}
