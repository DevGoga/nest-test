import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../database/postgres/entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>) {}

  async findOneUserByEmail(email: UserModel['email']): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: UserModel['id']): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createNewUser(user: Partial<UserModel>): Promise<UserModel> {
    return this.userRepository.create(user);
  }
}
