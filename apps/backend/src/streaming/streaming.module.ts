import {
  MiddlewareConsumer, Module, RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  AuthMiddleware, IdentityModule,
} from '@shared/auth';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackUseCase } from './domain/stream-track.use-case';
import { SpotifyStreamingAdapter } from './ext/spotify/spotify-streaming.adapter';

@Module({
  imports: [HttpModule, IdentityModule],
  controllers: [StreamingController],
  providers: [
    SpotifyStreamingAdapter,
    {
      provide: StreamTrackUseCase,
      inject: ['StreamingPort'],
      useFactory: port => new StreamTrackUseCase(port),
    },
    {
      provide: 'StreamingPort',
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
