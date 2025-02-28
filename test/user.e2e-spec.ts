import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { compareSync, hashSync } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { UserModel } from '../src/database/postgres/entities';
import { POSTGRES } from '../src/database/postgres/postgres.constants';
import { LoginDto, SignupDto } from '../src/modules/auth/dto';
import { UserPermission } from '../src/modules/user/user.enums';
import { UserService } from '../src/modules/user/user.service';

describe('User', () => {
  let app: INestApplication;
  let datasource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    datasource = app.get(POSTGRES);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await datasource.getRepository(UserModel).delete({});
    await app.close();
  });

  it('User Service should be defined', () => {
    expect(app.get(UserService)).toBeDefined();
  });

  it('Registration should works as expected. Password should de encrypted', async () => {
    const body: SignupDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app.getHttpServer()).post('/signup').send(body).expect(201);

    expect(response.body).toEqual({ result: true });

    const dbUser = await datasource.getRepository(UserModel).findOne({ where: { email: body.email } });

    expect(dbUser).toBeDefined();
    expect(dbUser?.email).toEqual(body.email);
    expect(compareSync(body.password, dbUser?.password ?? '')).toEqual(true);
  });

  it('Registration should throw error on duplicated email', async () => {
    const body: SignupDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await request(app.getHttpServer()).post('/signup').send(body).expect(201);
    await request(app.getHttpServer()).post('/signup').send(body).expect(409);
  });

  it('Login should works as expected', async () => {
    const email = faker.internet.email();
    const rawPassword = faker.internet.password();
    const rounds = 10;

    const loginBody: LoginDto = {
      email,
      password: rawPassword,
    };

    const user: Partial<UserModel> = {
      email,
      password: hashSync(rawPassword, rounds),
    };

    await datasource.getRepository(UserModel).save({ ...user, permission: UserPermission.base });

    await request(app.getHttpServer()).post('/login').send(loginBody).expect(200);
    await request(app.getHttpServer())
      .post('/login')
      .send({
        ...loginBody,
        password: 'BAD PASSWORD',
      })
      .expect(401);
  });
});
