import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../../modules/user/user.enums';
import { Tables } from '../postgres.constants';

@Entity({ name: Tables.users })
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.user })
  role: string;
}
