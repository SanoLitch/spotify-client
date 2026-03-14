import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@libs/logger';
import { AuthModule, AuthMiddleware } from './auth';
import { LibraryModule } from './library/library.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('NODE_ENV') || 'development',
    }),
    AuthModule,
    LibraryModule,
    StreamingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'streaming/:trackId',
        method: RequestMethod.GET,
      });
  }
}
