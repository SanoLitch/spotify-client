import { SpotifyAuthAdapter } from './spotify-auth.adapter';
import { SpotifyApiService } from '../../lib/spotify-api.service';
import { User } from '../../domain/user.entity';

describe('SpotifyAuthAdapter', () => {
  let adapter: SpotifyAuthAdapter;
  let spotifyApi: jest.Mocked<SpotifyApiService>;

  beforeEach(() => {
    spotifyApi = {
      exchangeCodeForTokens: jest.fn(),
      getProfile: jest.fn(),
    } as unknown as jest.Mocked<SpotifyApiService>;
    adapter = new SpotifyAuthAdapter(spotifyApi);
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
    expect(user.id).toBe(spotifyProfile.id);
    expect(user.displayName).toBe(spotifyProfile.display_name);
    expect(user.email).toBe(spotifyProfile.email);
    expect(user.avatarUrl).toBe('avatar.png');
  });
});
