import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tables } from '../postgres.constants';

@Entity({ name: Tables.users })
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  permission: string;
}
