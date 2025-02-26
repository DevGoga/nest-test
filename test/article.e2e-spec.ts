import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ArticleModel, UserModel } from '../src/database/postgres/entities';
import { POSTGRES } from '../src/database/postgres/postgres.constants';
import { findOneArticleCachingKey } from '../src/database/redis/redis.keys';
import { RedisService } from '../src/database/redis/redis.service';
import { ArticleService } from '../src/modules/article/article.service';
import { CreateArticleRequestBodyDto } from '../src/modules/article/dto';
import { LoginDto } from '../src/modules/auth/dto';
import { UserPermission } from '../src/modules/user/user.enums';

describe('Article', () => {
  let app: INestApplication;
  let datasource: DataSource;
  let redisService: RedisService;
  let authHeader: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    datasource = app.get(POSTGRES);
    redisService = app.get(RedisService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

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

    const response = await request(app.getHttpServer()).post('/login').send(loginBody).expect(201);
    authHeader = 'Bearer ' + response.body.accessToken;
  });

  afterAll(async () => {
    await datasource.getRepository(ArticleModel).delete({});
    await datasource.getRepository(UserModel).delete({});
    await app.close();
  });

  it('Article Service should be defined', () => {
    expect(app.get(ArticleService)).toBeDefined();
  });

  it('Create should work as expected', async () => {
    // TODO: Непонятно почему, но тест не проходит. В базу не сохраняется, хотя через сваггер всё работает
    const body: CreateArticleRequestBodyDto = {
      title: faker.book.title(),
      description: faker.lorem.sentence(),
    };

    const response = await request(app.getHttpServer())
      .post('/article')
      .set('Authorization', authHeader)
      .send(body)
      .expect(201);

    const dbArticle = await datasource.getRepository(ArticleModel).findOne({ where: { id: response.body.id } });

    expect(dbArticle).toBeDefined();
    expect(dbArticle).toContain(body);
  });

  it('Find One should work as expected', async () => {
    // TODO: Непонятно почему, но тест не проходит. В базу не сохраняется, хотя через сваггер всё работает
    const body: CreateArticleRequestBodyDto = {
      title: faker.book.title(),
      description: faker.lorem.sentence(),
    };

    const response = await request(app.getHttpServer())
      .post('/article')
      .set('Authorization', authHeader)
      .send(body)
      .expect(201);

    const article = await request(app.getHttpServer()).get(`/article/${response.body.id}`).expect(200);

    expect(article).toBeDefined();
    expect(article.body).toContain(body);
  });

  it('Find One should save cache', async () => {
    // TODO: Непонятно почему, но тест не проходит. В базу не сохраняется, хотя через сваггер всё работает
    const body: CreateArticleRequestBodyDto = {
      title: faker.book.title(),
      description: faker.lorem.sentence(),
    };

    const response = await request(app.getHttpServer())
      .post('/article')
      .set('Authorization', authHeader)
      .send(body)
      .expect(201);

    const articleId = response.body.id;

    const article = await request(app.getHttpServer()).get(`/article/${articleId}`).expect(200);

    const cache = await redisService.get(findOneArticleCachingKey(articleId));

    expect(article).toBeDefined();
    expect(article.body).toContain(body);
    expect(cache).toContain(article.body);
  });

  it('Delete should work as expected', async () => {
    // TODO: Непонятно почему, но тест не проходит. В базу не сохраняется, хотя через сваггер всё работает
    const body: CreateArticleRequestBodyDto = {
      title: faker.book.title(),
      description: faker.lorem.sentence(),
    };

    const response = await request(app.getHttpServer())
      .post('/article')
      .set('Authorization', authHeader)
      .send(body)
      .expect(201);

    const deleteResponse = await request(app.getHttpServer())
      .set('Authorization', authHeader)
      .delete(`/article/${response.body.id}`)
      .expect(200);

    const dbArticle = await datasource.getRepository(ArticleModel).findOne({ where: { id: response.body.id } });

    expect(dbArticle).toBeNull();
    expect(deleteResponse).toContain({ result: true });
  });
});
