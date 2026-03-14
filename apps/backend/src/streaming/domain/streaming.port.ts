import { Readable } from 'stream';

export const STREAMING_PORT = Symbol('STREAMING_PORT');

export interface StreamingPort {
  getTrackStream(trackId: string, accessToken: string): Promise<Readable>;
}
