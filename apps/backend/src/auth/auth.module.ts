import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthController } from './api/auth.controller';
import { AuthMiddleware } from './api/auth.middleware';
import { LoginUseCase } from './login.case';
import { LogoutUseCase } from './logout.case';
import { MeUseCase } from './me.case';
import { GetAuthUrlUseCase } from './get-auth-url.case';
import { SpotifyAuthAdapter } from './ext/spotify/spotify-auth.adapter';
import { CookieIdentityAdapter } from './ext/identity/cookie-identity.adapter';
import { InMemoryUserRepository } from './ext/storage/in-memory-user.repository';
import { Logger } from '@libs/logger';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [
    {
      provide: LoginUseCase,
      inject: ['AuthPort', 'UserRepositoryPort'],
      useFactory: (authPort, userRepo) => new LoginUseCase(authPort, userRepo),
    },
    {
      provide: GetAuthUrlUseCase,
      inject: ['AuthPort'],
      useFactory: authPort => new GetAuthUrlUseCase(authPort),
    },
    {
      provide: LogoutUseCase,
      useFactory: () => new LogoutUseCase(),
    },
    {
      provide: MeUseCase,
      inject: ['AuthPort'],
      useFactory: authPort => new MeUseCase(authPort),
    },
    {
      provide: 'AuthPort',
      inject: [HttpService, ConfigService],
      useFactory: (http, config) => new SpotifyAuthAdapter(http, config),
    },
    {
      provide: 'IdentityPort',
      useClass: CookieIdentityAdapter,
    },
    {
      provide: 'UserRepositoryPort',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: ['IdentityPort'],
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
