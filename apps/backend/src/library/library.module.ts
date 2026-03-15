import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from '@shared/auth';
import { HttpModule } from '@libs/http';
import { LibraryController } from './api/library.controller';
import { GetSavedTracksCase } from './get-saved-tracks.case';
import { SpotifyLibraryAdapter } from './ext/spotify/spotify-library.adapter';
import {
  LIBRARY_CLIENT_PORT, LIBRARY_PORT,
} from './ext/library.port';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      name: LIBRARY_CLIENT_PORT,
      useFactory: () => ({ baseURL: 'https://api.spotify.com' }),
    }),
    IdentityModule,
  ],
  controllers: [LibraryController],
  providers: [
    SpotifyLibraryAdapter,
    GetSavedTracksCase,
    {
      provide: LIBRARY_PORT,
      useExisting: SpotifyLibraryAdapter,
    },
  ],
})
export class LibraryModule {

}
