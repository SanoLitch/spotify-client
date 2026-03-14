import {
  Injectable, InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpotifyStreamingApiService {
  constructor(private readonly httpService: HttpService) {}

  async getTrack(accessToken: string, trackId: string) {
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
      throw new InternalServerErrorException(`Failed to fetch track details`);
    }
  }

  async getAudioStream(url: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'stream',
        }),
      );

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch audio stream`);
    }
  }
}
