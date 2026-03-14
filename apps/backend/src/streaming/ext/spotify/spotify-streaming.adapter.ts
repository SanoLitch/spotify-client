import {
  Injectable, InternalServerErrorException, Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Readable } from 'stream';
import { StreamingPort } from '../../domain/streaming.port';

@Injectable()
export class SpotifyStreamingAdapter implements StreamingPort {
  private readonly logger = new Logger(SpotifyStreamingAdapter.name);

  constructor(private readonly httpService: HttpService) {}

  public async getTrackStream(trackId: string, accessToken: string): Promise<Readable> {
    try {
      const track = await this.getTrack(accessToken, trackId);

      let previewUrl = track.preview_url;

      if (!previewUrl) {
        this.logger.warn(`No preview URL for track ${ trackId }, using fallback horse.mp3`);
        // Use a short silent or beep MP3 from a public source for R&D purposes
        previewUrl = 'https://www.w3schools.com/html/horse.mp3';
      }

      return this.getAudioStream(previewUrl);
    } catch (error) {
      this.logger.error(`Failed to get track stream for ${ trackId }`, error.stack);
      throw new InternalServerErrorException('Failed to fetch track stream');
    }
  }

  private async getTrack(accessToken: string, trackId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://api.spotify.com/v1/tracks/${ trackId }`, {
          headers: {
            Authorization: `Bearer ${ accessToken }`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Spotify API error fetching track ${ trackId }`, error.response?.data || error.message);
      throw new InternalServerErrorException(`Failed to fetch track details`);
    }
  }

  private async getAudioStream(url: string): Promise<Readable> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'stream',
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching audio stream from ${ url }`, error.message);
      throw new InternalServerErrorException(`Failed to fetch audio stream`);
    }
  }
}
