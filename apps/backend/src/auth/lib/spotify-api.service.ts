import {
  Injectable, InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpotifyApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async exchangeCodeForTokens(code: string) {
    const clientId = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_SECRET');
    const redirectUri = this.configService.getOrThrow<string>('SPOTIFY_REDIRECT_URI');

    const params = new URLSearchParams();

    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${ Buffer.from(`${ clientId }:${ clientSecret }`).toString('base64') }`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://accounts.spotify.com/api/token', params, { headers }),
      );

      return response.data;
    } catch (error) {
      console.error('Spotify Token Exchange Error:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Failed to exchange code for tokens');
    }
  }

  async getProfile(accessToken: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${ accessToken }`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Spotify Profile Error:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }

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