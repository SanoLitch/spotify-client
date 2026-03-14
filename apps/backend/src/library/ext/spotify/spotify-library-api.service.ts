import {
  Injectable, InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpotifyLibraryApiService {
  constructor(private readonly httpService: HttpService) {}

  async getSavedTracks(accessToken: string, limit: number, offset: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${ accessToken }`,
          },
          params: {
            limit,
            offset,
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Spotify Library Error:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch saved tracks');
    }
  }
}
