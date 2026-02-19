import { AuthPort } from './auth.port';
import { SpotifyApiService } from '../../lib/spotify-api.service';
import { User } from '../../domain/user.entity';

export class SpotifyAuthAdapter implements AuthPort {
  constructor(private readonly spotifyApi: SpotifyApiService) {}

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
