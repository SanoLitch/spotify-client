import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import {
  AuthMiddleware, IdentityModule,
} from '@shared/auth';
import { LibraryController } from './api/library.controller';
import { GetSavedTracksCase } from './get-saved-tracks.case';
import { SpotifyLibraryAdapter } from './ext/spotify/spotify-library.adapter';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    IdentityModule,
  ],
  controllers: [LibraryController],
  providers: [
    SpotifyLibraryApiService,
    GetSavedTracksCase,
    {
      provide: 'LibraryPort',
      inject: [SpotifyLibraryApiService],
      useFactory: api => new SpotifyLibraryAdapter(api),
    },
  ],
})
export class LibraryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'library/tracks',
        method: RequestMethod.GET,
      });
  }
}
