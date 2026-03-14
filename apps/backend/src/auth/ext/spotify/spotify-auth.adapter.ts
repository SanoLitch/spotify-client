import { AuthPort } from './auth.port';
import { SpotifyApiService } from '../../lib/spotify-api.service';
import { User } from '../../domain/user.entity';
import { ConfigService } from '@nestjs/config';

export class SpotifyAuthAdapter implements AuthPort {
  constructor(
    private readonly spotifyApi: SpotifyApiService,
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
    const data = await this.spotifyApi.exchangeCodeForTokens(code);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  public async getProfile(accessToken: string): Promise<User> {
    const data = await this.spotifyApi.getProfile(accessToken);

    return User.create({
      id: data.id,
      displayName: data.display_name,
      email: data.email,
      avatarUrl: data.images?.[0]?.url,
    });
  }
}
