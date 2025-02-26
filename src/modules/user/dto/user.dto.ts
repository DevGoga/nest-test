import { ApiProperty } from '@nestjs/swagger';
import { UserPermission } from '../user.enums';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @ApiProperty({ example: '$2b$10$coYcHwu58e1atqVm20UzOehIIBgiXp4JlHln/HqnARG/cMqtcpOL2' })
  password: string;

  @ApiProperty({ enum: UserPermission })
  permission: UserPermission;

  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  updatedAt: string;
}
