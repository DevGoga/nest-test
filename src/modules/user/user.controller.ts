import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserModel } from '../../database/postgres/entities';
import { Permission } from '../../decorators';
import { User } from '../../decorators/user';
import { AuthGuard, PermissionGuard } from '../../guards';
import { UserDto } from './dto';
import { UserPermission } from './user.enums';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Получить пользователя из текущего Access токена' })
  @Get('/profile')
  async getProfile(@User() user: UserModel) {
    return user;
  }

  @Permission(UserPermission.admin)
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @Get('/:id')
  async getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findUserById(id);
  }
}
