import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { UserPermission } from './user.enums';

@Injectable()
export class UserService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}

  async findOneUserByEmail(email: UserModel['email']): Promise<UserModel | null> {
    return this.datasource.getRepository(UserModel).findOne({ where: { email } });
  }

  async findUserById(id: UserModel['id']): Promise<UserModel> {
    const user = await this.datasource.getRepository(UserModel).findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(user: Partial<UserModel>): Promise<UserModel> {
    return this.datasource.getRepository(UserModel).save({ ...user, permission: UserPermission.base });
  }
}
