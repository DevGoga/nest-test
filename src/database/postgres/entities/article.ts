import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tables } from '../postgres.constants';

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
}
