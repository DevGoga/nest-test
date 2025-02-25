import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../../../modules/user/user.enums';
import { Columns, Tables } from '../postgres.constants';

export class CreateUserTable1740472925540 implements MigrationInterface {
  private readonly table = new Table({
    name: Tables.users,
    columns: [
      {
        name: Columns.id,
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: Columns.email,
        type: 'varchar',
        length: '255',
      },
      {
        name: Columns.password,
        type: 'varchar',
        length: '255',
      },
      {
        name: Columns.role,
        type: 'varchar',
        length: '255',
        default: UserRole.user,
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
