import { Module } from '@nestjs/common';
import { IdentityModule } from '@shared/auth';
import { HttpModule } from '@libs/http';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackCase } from './stream-track.case';
import { SpotifyStreamingAdapter } from './ext/spotify/spotify-streaming.adapter';
import {
  STREAMING_CLIENT_PORT, STREAMING_PORT,
} from './ext/streaming.port';

@Module({
  imports: [
    HttpModule.registerAsync({
      name: STREAMING_CLIENT_PORT,
      useFactory: () => ({ baseURL: 'https://api.spotify.com' }),
    }),
    IdentityModule,
  ],
  controllers: [StreamingController],
  providers: [
    SpotifyStreamingAdapter,
    StreamTrackCase,
    {
      provide: STREAMING_PORT,
      useExisting: SpotifyStreamingAdapter,
    },
  ],
})
export class StreamingModule { }
