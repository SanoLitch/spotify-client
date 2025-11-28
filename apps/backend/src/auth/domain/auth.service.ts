import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpotifyApiService } from '../lib/spotify-api.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly spotifyApi: SpotifyApiService,
  ) {}

  public getSpotifyAuthorizeUrl(): string {
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

  async authenticate(code: string) {
    return this.spotifyApi.exchangeCodeForTokens(code);
  }

  async getMe(accessToken: string) {
    return this.spotifyApi.getProfile(accessToken);
  }
}
