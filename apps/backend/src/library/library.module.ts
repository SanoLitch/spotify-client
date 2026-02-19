import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LibraryController } from './api/library.controller';
import { GetSavedTracksUseCase } from './domain/get-saved-tracks.use-case';
import { SpotifyLibraryAdapter } from './ext/spotify/spotify-library.adapter';
import { SpotifyApiService } from '../auth/lib/spotify-api.service';
import { AuthMiddleware } from '../auth/api/auth.middleware';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [LibraryController],
  providers: [
    SpotifyApiService,
    {
      provide: GetSavedTracksUseCase,
      inject: ['LibraryPort'],
      useFactory: (libraryPort) => new GetSavedTracksUseCase(libraryPort),
    },
    {
      provide: 'LibraryPort',
      inject: [SpotifyApiService],
      useFactory: (api) => new SpotifyLibraryAdapter(api),
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
