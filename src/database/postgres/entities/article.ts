import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tables } from '../postgres.constants';
import { UserModel } from './user';

@Entity({ name: Tables.articles })
export class ArticleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dateOfPublication: Date;

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'authorId' })
  author: UserModel;

  @Column()
  authorId: number;
}
