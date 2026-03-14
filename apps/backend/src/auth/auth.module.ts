import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import {
  AuthMiddleware, IdentityModule,
} from '@shared/auth';
import { AuthController } from './api/auth.controller';
import { LoginUseCase } from './login.case';
import { LogoutUseCase } from './logout.case';
import { MeUseCase } from './me.case';
import { GetAuthUrlUseCase } from './get-auth-url.case';
import { SpotifyAuthAdapter } from './ext/spotify/spotify-auth.adapter';
import { InMemoryUserRepository } from './ext/storage/in-memory-user.repository';
import { AUTH_PORT } from './ext/spotify/auth.port';
import { USER_REPOSITORY_PORT } from './ext/storage/user-repository.port';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    IdentityModule,
  ],
  controllers: [AuthController],
  providers: [
    SpotifyAuthAdapter,
    {
      provide: AUTH_PORT,
      useExisting: SpotifyAuthAdapter,
    },
    InMemoryUserRepository,
    {
      provide: USER_REPOSITORY_PORT,
      useExisting: InMemoryUserRepository,
    },
    LoginUseCase,
    GetAuthUrlUseCase,
    LogoutUseCase,
    MeUseCase,
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
