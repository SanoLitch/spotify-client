import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';
import { AuthPort } from './auth.port';
import {
  SpotifyProfileDto, SpotifyTokenResponseDto,
} from './spotify-profile.dto';
import { User } from '../../domain/user.entity';
import { UserMapper } from '../../lib/user.mapper';

@Injectable()
export class SpotifyAuthAdapter implements AuthPort {
  private readonly logger = new Logger(SpotifyAuthAdapter.name);

  constructor(
    private readonly httpService: HttpService,
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
        this.httpService.post<SpotifyTokenResponseDto>('https://accounts.spotify.com/api/token', params, { headers }),
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      };
    } catch (error) {
      this.logger.error('Spotify Token Exchange Error', {
        error: error?.response?.data || error.message,
      });
      throw new InternalServerErrorException('Failed to exchange code for tokens');
    }
  }

  public async getProfile(accessToken: string): Promise<User> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<SpotifyProfileDto>('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${ accessToken }`,
          },
        }),
      );

      return UserMapper.toEntity(response.data);
    } catch (error) {
      this.logger.error('Spotify Profile Error', {
        error: error?.response?.data || error.message,
      });
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }
}
