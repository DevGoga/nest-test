import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';

@Injectable()
export class UserService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}

  async findOneUserByEmail(email: UserModel['email']): Promise<UserModel | null> {
    return this.datasource.getRepository(UserModel).findOne({ where: { email } });
  }

  async findUserById(id: UserModel['id']): Promise<UserModel | null> {
    return this.datasource.getRepository(UserModel).findOne({ where: { id } });
  }

  async createNewUser(user: Partial<UserModel>): Promise<UserModel> {
    return this.datasource.getRepository(UserModel).create(user);
  }
}
