import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder, SwaggerModule,
} from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import {
  FastifyAdapter, NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';

const API_PREFIX = 'api';
const DOC_PREFIX = 'docs';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);

  // @ts-ignore
  await app.register(fastifyCookie);

  app.setGlobalPrefix(API_PREFIX);

  app.enableCors({
    origin: configService.get<string>('FE_URI') || 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Spotify Client API')
    .setDescription(
      'The Spotify Client application API description. '
      + '<br/><br/>'
      + '<b>Note:</b> To test protected endpoints, you must first log in here: '
      + '<a href="/api/auth/login" target="_blank">Login with Spotify</a>',
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('library')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    `/${ DOC_PREFIX }`,
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  const port = process.env.APP_PORT || 4000;

  await app.listen(port);

  logger.log(`Backend is running on: http://localhost:${ port }/${ API_PREFIX }`);
  logger.log(`API Reference is available at: http://localhost:${ port }/${ DOC_PREFIX }`);
}
bootstrap();
