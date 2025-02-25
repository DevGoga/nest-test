import { FastifyRequest } from 'fastify';
import { UserModel } from './database/postgres/entities';

export type RequestWithUser = FastifyRequest & {
  user: UserModel;
};
