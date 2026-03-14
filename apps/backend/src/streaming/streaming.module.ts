import {
  MiddlewareConsumer, Module, RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  AuthMiddleware, IdentityModule,
} from '@shared/auth';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackCase } from './stream-track.case';
import { SpotifyStreamingAdapter } from './ext/spotify/spotify-streaming.adapter';
import { STREAMING_PORT } from './domain/streaming.port';

@Module({
  imports: [HttpModule, IdentityModule],
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
export class StreamingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'streaming/:trackId',
        method: RequestMethod.GET,
      });
  }
}
