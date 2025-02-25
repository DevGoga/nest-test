import { UserModel } from '../../database/postgres/entities';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type TokenType = 'access' | 'refresh';

export type TokenPayload = {
  id: UserModel['id'];
};
