import { Readable } from 'stream';
import { StreamingPort } from '../domain/streaming.port';

export class DummyStreamingAdapter implements StreamingPort {
  public async getTrackStream(trackId: string): Promise<Readable> {
    // Return a readable stream that generates some dummy "audio" data
    return new Readable({
      read(size) {
        // Just push random bytes to simulate an audio stream
        this.push(Buffer.alloc(size, Math.random() * 255));

        /*
         * In a real implementation, we would eventually push null
         * or handle backpressure. For R&D noise, we keep it simple.
         */
      },
    });
  }
}
