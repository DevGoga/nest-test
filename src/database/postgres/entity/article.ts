import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('date')
  dateOfPublication: Date;

  @Column()
  author: string;
}
