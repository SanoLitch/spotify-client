import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { SpotifyAuthAdapter } from './spotify-auth.adapter';
import { User } from '../../domain/user.entity';

describe('SpotifyAuthAdapter', () => {
  let adapter: SpotifyAuthAdapter;
  let httpService: jest.Mocked<HttpService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    httpService = {
      post: jest.fn(),
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpService>;
    configService = {
      getOrThrow: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;
    adapter = new SpotifyAuthAdapter(httpService, configService);
  });

  it('should return auth url', () => {
    configService.getOrThrow.mockImplementation((key: string) => {
      if (key === 'SPOTIFY_CLIENT_ID') return 'client_id';
      if (key === 'SPOTIFY_REDIRECT_URI') return 'redirect_uri';
      if (key === 'SPOTIFY_AUTH_URI') {
        return 'https://auth.com?client_id=$CLIENT_ID&scope=$SCOPES&redirect_uri=$REDIRECT_URI';
      }
      return '';
    });

    const url = adapter.getAuthUrl();

    expect(url).toContain('client_id=client_id');
    expect(url).toContain('redirect_uri=redirect_uri');
  });

  it('should exchange code for tokens', async () => {
    const code = 'code';
    const mockResponse = {
      data: {
        access_token: 'at',
        refresh_token: 'rt',
      },
    };

    configService.getOrThrow.mockReturnValue('value');
    httpService.post.mockReturnValue(of(mockResponse as any));

    const result = await adapter.exchangeCodeForTokens(code);

    expect(httpService.post).toHaveBeenCalled();
    expect(result).toEqual({
      accessToken: 'at',
      refreshToken: 'rt',
    });
  });

  it('should get profile and map to User entity', async () => {
    const accessToken = 'at';
    const mockResponse = {
      data: {
        id: 'sp-id',
        display_name: 'Spotify User',
        email: 'sp@example.com',
        images: [{ url: 'avatar.png' }],
      },
    };

    httpService.get.mockReturnValue(of(mockResponse as any));

    const user = await adapter.getProfile(accessToken);

    expect(httpService.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    expect(user).toBeInstanceOf(User);
    expect(user.id.getValue()).toBe('sp-id');
    expect(user.displayName).toBe('Spotify User');
    expect(user.email).toBe('sp@example.com');
    expect(user.avatarUrl).toBe('avatar.png');
  });
});
