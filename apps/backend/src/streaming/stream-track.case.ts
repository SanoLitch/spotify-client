import {
  Injectable, Inject,
} from '@nestjs/common';
import { Readable } from 'stream';
import {
  STREAMING_PORT, StreamingPort,
} from './ext/streaming.port';

@Injectable()
export class StreamTrackCase {
  constructor(
    @Inject(STREAMING_PORT)
    private readonly streamingPort: StreamingPort,
  ) {}

  public async execute(trackId: string, accessToken: string): Promise<Readable> {
    return this.streamingPort.getTrackStream(trackId, accessToken);
  }
}
