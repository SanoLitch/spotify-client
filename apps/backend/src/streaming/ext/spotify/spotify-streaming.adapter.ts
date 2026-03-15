import {
  Injectable, Logger,
} from '@nestjs/common';
import {
  HttpClient, InjectApi,
} from '@libs/http';
import { Readable } from 'node:stream';
import {
  STREAMING_CLIENT_PORT, StreamingPort,
} from '../streaming.port';

@Injectable()
export class SpotifyStreamingAdapter implements StreamingPort {
  private readonly logger = new Logger(SpotifyStreamingAdapter.name);

  constructor(
    @InjectApi(STREAMING_CLIENT_PORT)
    private readonly httpService: HttpClient,
  ) {}

  public async getTrackStream(trackId: string, accessToken: string): Promise<Readable> {
    const track = await this.httpService.api(`/v1/tracks/${ trackId }`, {
      headers: {
        Authorization: `Bearer ${ accessToken }`,
      },
    });

    let previewUrl = track.preview_url;

    if (!previewUrl) {
      this.logger.warn(`No preview URL for track ${ trackId }, using fallback horse.mp3`);
      // Use a short silent or beep MP3 from a public source for R&D purposes
      previewUrl = 'https://www.w3schools.com/html/horse.mp3';
    }
    const stream = await this.httpService.api(previewUrl, {
      responseType: 'stream',
    }) as any;

    return Readable.fromWeb(stream);
  }
}
