import { Module } from '@nestjs/common';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackUseCase } from './domain/stream-track.use-case';
import { SpotifyStreamingAdapter } from './ext/spotify-streaming.adapter';
import { SpotifyStreamingApiService } from './ext/spotify/spotify-streaming-api.service';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [StreamingController],
  providers: [
    SpotifyStreamingApiService,
    {
      provide: StreamTrackUseCase,
      inject: ['StreamingPort'],
      useFactory: port => new StreamTrackUseCase(port),
    },
    {
      provide: 'StreamingPort',
      inject: [SpotifyStreamingApiService],
      useFactory: api => new SpotifyStreamingAdapter(api),
    },
  ],
})
export class StreamingModule {}
