import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_VERSION } from '../app.constants';

export const bootstrapSwagger = (app: INestApplication) => {
  const title = 'Georgi Zarkya Test API';

  const config = new DocumentBuilder().setTitle(title).setVersion(APP_VERSION).addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: title,
  });
};
