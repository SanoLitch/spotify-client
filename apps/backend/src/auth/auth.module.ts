import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from '@shared/auth';
import { HttpModule } from '@libs/http';
import { AuthController } from './api/auth.controller';
import { LoginUseCase } from './login.case';
import { LogoutUseCase } from './logout.case';
import { GetAuthUrlUseCase } from './get-auth-url.case';
import { SpotifyAuthAdapter } from './ext/spotify/spotify-auth.adapter';
import {
  AUTH_CLIENT_PORT, AUTH_PORT,
} from './ext/auth.port';
;
@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      name: AUTH_CLIENT_PORT,
      useFactory: () => ({ baseURL: 'https://accounts.spotify.com/api' }),
    }),
    IdentityModule,
  ],
  controllers: [AuthController],
  providers: [
    SpotifyAuthAdapter,
    {
      provide: AUTH_PORT,
      useExisting: SpotifyAuthAdapter,
    },
    LoginUseCase,
    GetAuthUrlUseCase,
    LogoutUseCase,
  ],
})
export class AuthModule {}
