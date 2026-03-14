import { Readable } from 'stream';
import { StreamingPort } from './streaming.port';

export class StreamTrackUseCase {
  constructor(private readonly streamingPort: StreamingPort) {}

  public async execute(trackId: string, accessToken: string): Promise<Readable> {
    return this.streamingPort.getTrackStream(trackId, accessToken);
  }
}
