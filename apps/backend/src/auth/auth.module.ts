import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './api/auth.controller';
import { SpotifyApiService } from './lib/spotify-api.service';
import { AuthMiddleware } from './api/auth.middleware';
import { LoginUseCase } from './domain/login.use-case';
import { LogoutUseCase } from './domain/logout.use-case';
import { SpotifyAuthAdapter } from './ext/spotify/spotify-auth.adapter';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [
    SpotifyApiService,
    {
      provide: LoginUseCase,
      inject: ['AuthPort', 'UserRepositoryPort'],
      useFactory: (authPort, userRepo) => new LoginUseCase(authPort, userRepo),
    },
    {
      provide: LogoutUseCase,
      useFactory: () => new LogoutUseCase(),
    },
    {
      provide: 'AuthPort',
      inject: [SpotifyApiService],
      useFactory: (api) => new SpotifyAuthAdapter(api),
    },
    {
      provide: 'UserRepositoryPort',
      useValue: {
        save: async () => {},
        findById: async () => null,
        findByEmail: async () => null,
      },
    },
  ],
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