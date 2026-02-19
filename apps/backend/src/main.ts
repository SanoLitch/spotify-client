import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder, SwaggerModule,
} from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Spotify Client API')
    .setDescription('The Spotify Client application API description')
    .setVersion('1.0')
    .addTag('spotify')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  const port = process.env.APP_PORT || 3001;

  await app.listen(port);
  logger.log(`Backend is running on: http://localhost:${ port }/api`);
  logger.log(`API Reference is available at: http://localhost:${ port }/reference`);
}
bootstrap();
