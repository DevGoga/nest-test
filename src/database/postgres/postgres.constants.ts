export const POSTGRES = 'POSTGRES';

export enum Tables {
  users = 'users',
  articles = 'articles',
}

export enum Columns {
  id = 'id',
  email = 'email',
  password = 'password',
  permission = 'permission',
  title = 'title',
  description = 'description',
  dateOfPublication = 'dateOfPublication',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  authorId = 'authorId',
}
