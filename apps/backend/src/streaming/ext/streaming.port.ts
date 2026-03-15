import { Readable } from 'stream';

export const STREAMING_CLIENT_PORT = 'STREAMING_CLIENT_PORT';

export const STREAMING_PORT = Symbol('STREAMING_PORT');

export interface StreamingPort {
  getTrackStream(trackId: string, accessToken: string): Promise<Readable>;
}
