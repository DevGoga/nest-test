import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { compareSync } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { bootstrapPipes } from '../src/bootstrap';
import { UserModel } from '../src/database/postgres/entities';
import { POSTGRES } from '../src/database/postgres/postgres.constants';
import { ExceptionFilter } from '../src/filters/exception-filter';
import { SignupDto } from '../src/modules/auth/dto';

describe('User', () => {
  let app: INestApplication;
  let datasource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    datasource = app.get(POSTGRES);

    bootstrapPipes(app);

    app.useGlobalFilters(new ExceptionFilter());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await datasource.getRepository(UserModel).delete({});
    await app.close();
  });

  it('/signup should return error on empty body', async () => {
    const body = {};

    const response = await request(app.getHttpServer()).post('/signup').send(body).expect(400);

    expect(response.body).toBeDefined();
  });

  it('/signup should register new user', async () => {
    const body: SignupDto = {
      email: 'signup-test-0@gmail.com',
      password: '123456',
    };

    const response = await request(app.getHttpServer()).post('/signup').send(body).expect(201);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({ result: true });
  });

  it('/signup should save user with hashed password', async () => {
    const body: SignupDto = {
      email: 'signup-test-1@gmail.com',
      password: '123456',
    };

    const response = await request(app.getHttpServer()).post('/signup').send(body).expect(201);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({ result: true });

    const userDb = await datasource.getRepository(UserModel).findOne({ where: { email: body.email } });

    expect(userDb?.email).toEqual(body.email);
    expect(compareSync(body.password, userDb?.password ?? '')).toEqual(true);
  });

  it('/signup should throw error on duplicated email', async () => {
    const body: SignupDto = {
      email: 'duplicate-test@gmail.com',
      password: '123456',
    };

    await request(app.getHttpServer()).post('/signup').send(body).expect(201);
    await request(app.getHttpServer()).post('/signup').send(body).expect(409);

    const countOfUsersWithThisEmail = await datasource.getRepository(UserModel).count({ where: { email: body.email } });

    expect(countOfUsersWithThisEmail).toEqual(1);
  });

  it('/login should return JWT tokens', async () => {
    const body: SignupDto = {
      email: 'login-test@gmail.com',
      password: '123456',
    };

    await request(app.getHttpServer()).post('/signup').send(body).expect(201);

    const response = await request(app.getHttpServer()).post('/login').send(body).expect(200);

    expect(response.body).toBeDefined();

    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    expect(typeof response.body.accessToken).toBe('string');
    expect(typeof response.body.refreshToken).toBe('string');
  });

  it('/profile should return correct profile', async () => {
    const body: SignupDto = {
      email: 'profile-test@gmail.com',
      password: '123456',
    };

    await request(app.getHttpServer()).post('/signup').send(body).expect(201);

    const {
      body: { accessToken },
    } = await request(app.getHttpServer()).post('/login').send(body).expect(200);

    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe('string');

    const response = await request(app.getHttpServer())
      .get('/user/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.email).toBe(body.email);
  });
});
