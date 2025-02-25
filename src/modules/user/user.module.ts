import { Module } from '@nestjs/common';
import { PostgresModule } from '../../database/postgres';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PostgresModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
