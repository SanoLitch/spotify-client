import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import {
  HttpClient, InjectApi,
} from '@libs/http';
import { SpotifyTokenResponseDto } from './spotify-token.dto';
import {
  AUTH_CLIENT_PORT, AuthPort,
} from '../auth.port';

@Injectable()
export class SpotifyAuthAdapter implements AuthPort {
  private readonly logger = new Logger(SpotifyAuthAdapter.name);

  constructor(
    @InjectApi(AUTH_CLIENT_PORT)
    private readonly spotifyAuth: HttpClient,
    private readonly configService: ConfigService,
  ) {}

  public getAuthUrl(): string {
    const clientId = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    const redirectUri = this.configService.getOrThrow<string>('SPOTIFY_REDIRECT_URI');
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
    ].join(' ');
    const authUri = this.configService.getOrThrow<string>('SPOTIFY_AUTH_URI');

    return authUri
      .replace('$CLIENT_ID', clientId)
      .replace('$SCOPES', encodeURIComponent(scopes))
      .replace('$REDIRECT_URI', encodeURIComponent(redirectUri));
  }

  public async exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    const clientId = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_SECRET');
    const redirectUri = this.configService.getOrThrow<string>('SPOTIFY_REDIRECT_URI');

    /*
     * const params = new URLSearchParams();
     *
     * params.append('grant_type', 'authorization_code');
     * params.append('code', code);
     * params.append('redirect_uri', redirectUri);
     */

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${ Buffer.from(`${ clientId }:${ clientSecret }`).toString('base64') }`,
    };

    try {
      const response = await this.spotifyAuth.api<SpotifyTokenResponseDto>('/token', {
        method: 'POST',
        query: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        },
        headers,
      });

      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
    } catch (error) {
      this.logger.error('Spotify Token Exchange Error', {
        error: error?.response?.data || error.message,
      });
      throw new InternalServerErrorException('Failed to exchange code for tokens');
    }
  }
}
