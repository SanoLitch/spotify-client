import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { apiClient } from '@shared/api';
import { SpotifyAuthAdapter } from './auth.adapter';
import { User } from '../../domain/user.model';

vi.mock('@shared/api', () => ({
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
    const mockDto = {
      id: '123',
      displayName: 'Test',
      email: 'test@test.com',
      avatarUrl: 'img',
    };

    vi.mocked(apiClient.get).mockReturnValue({
      json: () => Promise.resolve(mockDto),
    } as any);

    const user = await adapter.getMe();

    expect(apiClient.get).toHaveBeenCalledWith('auth/me');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('123');
    expect(user.displayName).toBe('Test');
  });

  it('should call logout endpoint', async () => {
    vi.mocked(apiClient.get).mockReturnValue({
      json: () => Promise.resolve({}),
    } as any);

    await adapter.logout();

    expect(apiClient.get).toHaveBeenCalledWith('auth/logout');
  });
});
