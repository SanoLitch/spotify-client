import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), '../../.certs/localhost.key')),
    cert: fs.readFileSync(path.join(process.cwd(), '../../.certs/localhost.crt')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(cookieParser());
  app.enableCors({
    origin: 'https://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
