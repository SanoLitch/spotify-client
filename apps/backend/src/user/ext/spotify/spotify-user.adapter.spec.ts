import { ConfigService } from '@nestjs/config';
import { HttpClient } from '@libs/http';
import { Mocked } from 'vitest';
import { createMockHttpClient } from '@shared/test';
import { SpotifyUserAdapter } from './spotify-user.adapter';
import { User } from '../../domain/user.entity';

describe('SpotifyUserAdapter', () => {
  let adapter: SpotifyUserAdapter;
  let httpService: Mocked<HttpClient>;
  let configService: Mocked<ConfigService>;

  beforeEach(() => {
    httpService = createMockHttpClient();
    configService = {
      getOrThrow: vi.fn(),
    } as unknown as Mocked<ConfigService>;
    adapter = new SpotifyUserAdapter(httpService);
  });

  it('should get profile and map to User entity', async () => {
    const accessToken = 'at';
    const mockResponse = {
      id: 'sp-id',
      display_name: 'Spotify User',
      email: 'sp@example.com',
      images: [{ url: 'avatar.png' }],
    };

    httpService.api.mockReturnValue(Promise.resolve(mockResponse));

    const user = await adapter.getProfile(accessToken);

    expect(httpService.api).toHaveBeenCalledWith('/v1/me', expect.any(Object));
    expect(user).toBeInstanceOf(User);
    expect(user.id.getValue()).toBe('sp-id');
    expect(user.displayName).toBe('Spotify User');
    expect(user.email).toBe('sp@example.com');
    expect(user.avatarUrl).toBe('avatar.png');
  });
});
