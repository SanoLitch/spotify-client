import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from '@shared/auth';
import { HttpModule } from '@libs/http';
import { MeUseCase } from './me.case';
import { InMemoryUserRepository } from './ext/storage/in-memory-user.repository';
import { UserController } from './api/user.controller';
import { USER_REPOSITORY_PORT } from './ext/user-repository.port';
import {
  USER_CLIENT_PORT, USER_PORT,
} from './ext/user.port';
import { SpotifyUserAdapter } from './ext/spotify/spotify-user.adapter';
;
@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      name: USER_CLIENT_PORT,
      useFactory: () => ({ baseURL: 'https://api.spotify.com' }),
    }),
    IdentityModule,
  ],
  controllers: [UserController],
  providers: [
    InMemoryUserRepository,
    {
      provide: USER_REPOSITORY_PORT,
      useExisting: InMemoryUserRepository,
    },
    SpotifyUserAdapter,
    {
      provide: USER_PORT,
      useExisting: SpotifyUserAdapter,
    },
    MeUseCase,
  ],
})
export class UserModule { }
