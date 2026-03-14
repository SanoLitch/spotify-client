import { Readable } from 'stream';

export interface StreamingPort {
  getTrackStream(trackId: string, accessToken: string): Promise<Readable>;
}
