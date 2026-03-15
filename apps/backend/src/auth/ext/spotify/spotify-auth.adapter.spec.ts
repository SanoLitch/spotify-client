import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { HttpClient } from '@libs/http';
import { Mocked } from 'vitest';
import { createMockHttpClient } from '@shared/test';
import { SpotifyAuthAdapter } from './spotify-auth.adapter';

describe('SpotifyAuthAdapter', () => {
  let adapter: SpotifyAuthAdapter;
  let httpService: Mocked<HttpClient>;
  let configService: Mocked<ConfigService>;

  beforeEach(() => {
    httpService = createMockHttpClient();
    configService = {
      getOrThrow: vi.fn(),
    } as unknown as Mocked<ConfigService>;
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
      access_token: 'at',
      refresh_token: 'rt',
    };

    configService.getOrThrow.mockReturnValue('value');
    httpService.api.mockReturnValue(Promise.resolve(mockResponse));

    const result = await adapter.exchangeCodeForTokens(code);

    expect(httpService.api).toHaveBeenCalled();
    expect(result).toEqual({
      accessToken: 'at',
      refreshToken: 'rt',
    });
  });
});
