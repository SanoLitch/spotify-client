import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import {
  SpotifyAuthAdapter, UserProfileDto,
} from './auth.adapter';
import { apiClient } from '../../../shared/api/api-client';
import { User } from '../../domain/user.model';

vi.mock('../../../shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('SpotifyAuthAdapter', () => {
  let adapter: SpotifyAuthAdapter;

  beforeEach(() => {
    adapter = new SpotifyAuthAdapter();

    vi.clearAllMocks();
  });

  it('should fetch profile and return User model', async () => {
    const mockDto: UserProfileDto = {
      id: '123',
      display_name: 'Test',
      email: 'test@test.com',
      images: [{ url: 'img' }],
    };

    vi.mocked(apiClient.get).mockReturnValue({
      json: () => Promise.resolve(mockDto),
    });

    const user = await adapter.getMe();

    expect(apiClient.get).toHaveBeenCalledWith('auth/me');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('123');
    expect(user.displayName).toBe('Test');
  });

  it('should call logout endpoint', async () => {
    vi.mocked(apiClient.get).mockReturnValue({
      json: () => Promise.resolve({}),
    });

    await adapter.logout();

    expect(apiClient.get).toHaveBeenCalledWith('auth/logout');
  });
});
