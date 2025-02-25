import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserModel } from '../../database/postgres/entities';
import { User } from '../../decorators/user';
import { AuthGuard } from '../../guards';
import { UserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Получить пользователя из текущего Access токена' })
  @Get('/profile')
  async getProfile(@User() user: UserModel) {
    return user;
  }

  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @Get('/:id')
  async getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findUserById(id);
  }
}
