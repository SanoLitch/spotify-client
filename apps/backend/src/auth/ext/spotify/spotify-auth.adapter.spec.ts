import { SpotifyAuthAdapter } from './spotify-auth.adapter';
import { SpotifyApiService } from '../../lib/spotify-api.service';
import { User } from '../../domain/user.entity';
import { ConfigService } from '@nestjs/config';

describe('SpotifyAuthAdapter', () => {
  let adapter: SpotifyAuthAdapter;
  let spotifyApi: jest.Mocked<SpotifyApiService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    spotifyApi = {
      exchangeCodeForTokens: jest.fn(),
      getProfile: jest.fn(),
    } as unknown as jest.Mocked<SpotifyApiService>;
    configService = {
      getOrThrow: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;
    adapter = new SpotifyAuthAdapter(spotifyApi, configService);
  });

  it('should return auth url', () => {
    configService.getOrThrow.mockImplementation((key: string) => {
      if (key === 'SPOTIFY_CLIENT_ID') return 'client_id';
      if (key === 'SPOTIFY_REDIRECT_URI') return 'redirect_uri';
      if (key === 'SPOTIFY_AUTH_URI') return 'https://auth.com?client_id=$CLIENT_ID&scope=$SCOPES&redirect_uri=$REDIRECT_URI';
      return '';
    });

    const url = adapter.getAuthUrl();

    expect(url).toContain('client_id=client_id');
    expect(url).toContain('redirect_uri=redirect_uri');
  });

  it('should exchange code for tokens', async () => {
    const code = 'code';
    const tokens = {
      access_token: 'at',
      refresh_token: 'rt',
    };

    spotifyApi.exchangeCodeForTokens.mockResolvedValue(tokens);

    const result = await adapter.exchangeCodeForTokens(code);

    expect(spotifyApi.exchangeCodeForTokens).toHaveBeenCalledWith(code);
    expect(result).toEqual({
      accessToken: 'at',
      refreshToken: 'rt',
    });
  });

  it('should get profile and map to User entity', async () => {
    const accessToken = 'at';
    const spotifyProfile = {
      id: 'sp-id',
      display_name: 'Spotify User',
      email: 'sp@example.com',
      images: [{ url: 'avatar.png' }],
    };

    spotifyApi.getProfile.mockResolvedValue(spotifyProfile);

    const user = await adapter.getProfile(accessToken);

    expect(spotifyApi.getProfile).toHaveBeenCalledWith(accessToken);
    expect(user).toBeInstanceOf(User);
    expect(user.id.getValue()).toBe(spotifyProfile.id);
    expect(user.displayName).toBe(spotifyProfile.display_name);
    expect(user.email).toBe(spotifyProfile.email);
    expect(user.avatarUrl).toBe('avatar.png');
  });
});
