import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import {
  ConfigModule, ConfigService,
} from '@nestjs/config';
import {
  HttpModule, HttpService,
} from '@nestjs/axios';
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

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    IdentityModule,
  ],
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
      provide: 'UserRepositoryPort',
      useClass: InMemoryUserRepository,
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
