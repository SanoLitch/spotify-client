import { Module } from '@nestjs/common';
import { StreamingController } from './api/streaming.controller';
import { StreamTrackUseCase } from './domain/stream-track.use-case';
import { DummyStreamingAdapter } from './ext/dummy-streaming.adapter';

@Module({
  controllers: [StreamingController],
  providers: [
    {
      provide: StreamTrackUseCase,
      inject: ['StreamingPort'],
      useFactory: (port) => new StreamTrackUseCase(port),
    },
    {
      provide: 'StreamingPort',
      useClass: DummyStreamingAdapter,
    },
  ],
})
export class StreamingModule {}
