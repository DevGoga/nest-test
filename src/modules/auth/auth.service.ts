import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TTL } from '../../app.constants';
import appConfig from '../../config';
import { UserModel } from '../../database/postgres/entities';
import { UserService } from '../user/user.service';
import { TokenPair, TokenPayload, TokenType } from './auth.types';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(dto: SignupDto) {
    const exists = await this.userService.findOneUserByEmail(dto.email);

    if (exists) {
      throw new ConflictException(`User already exists`);
    }

    await this.userService.createNewUser({
      email: dto.email,
      password: hashSync(dto.password, appConfig.passwordRound),
    });

    return true;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOneUserByEmail(dto.email);

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException();
    }

    return this.makeTokenPair(user);
  }

  async verify(token: string, type: TokenType): Promise<boolean> {
    const secrets = {
      access: appConfig.jwt.accessSecret,
      refresh: appConfig.jwt.refreshSecret,
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, secrets[type], (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  async decode(token: string, type: TokenType): Promise<UserModel> {
    const valid = await this.verify(token, 'access');

    if (!valid) {
      throw new UnauthorizedException();
    }

    const decoded = jwt.decode(token, { json: true });

    if (!decoded) {
      throw new UnauthorizedException();
    }

    return decoded as UserModel;
  }

  private makeTokenPair(payload: TokenPayload): TokenPair {
    const accessToken = jwt.sign(payload, appConfig.jwt.accessSecret, { expiresIn: JWT_ACCESS_TTL, noTimestamp: true });
    const refreshToken = jwt.sign(payload, appConfig.jwt.refreshSecret);

    return { accessToken, refreshToken };
  }
}
