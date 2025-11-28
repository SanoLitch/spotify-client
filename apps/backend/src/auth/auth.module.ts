import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './api/auth.controller';
import { AuthService } from './domain/auth.service';
import { SpotifyApiService } from './lib/spotify-api.service';
import { AuthMiddleware } from './api/auth.middleware';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, SpotifyApiService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'auth/me',
        method: RequestMethod.GET,
      });
  }
}
