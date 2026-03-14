import { Module } from '@nestjs/common';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackUseCase } from './domain/stream-track.use-case';
import { SpotifyStreamingAdapter } from './ext/spotify-streaming.adapter';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StreamingController],
  providers: [
    {
      provide: StreamTrackUseCase,
      inject: ['StreamingPort'],
      useFactory: port => new StreamTrackUseCase(port),
    },
    {
      provide: 'StreamingPort',
      useClass: SpotifyStreamingAdapter,
    },
  ],
})
export class StreamingModule {}
