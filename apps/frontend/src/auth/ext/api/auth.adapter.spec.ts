import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpotifyAuthAdapter } from './auth.adapter';
import { api } from '../../../ext/core/api';
import { User } from '../../domain/user.model';

vi.mock('../../../ext/core/api', () => ({
  api: {
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
      display_name: 'Test',
      email: 'test@test.com',
      images: [{ url: 'img' }],
    };

    vi.mocked(api.get).mockReturnValue({
      json: () => Promise.resolve(mockDto),
    } as any);

    const user = await adapter.getMe();

    expect(api.get).toHaveBeenCalledWith('auth/me');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('123');
    expect(user.displayName).toBe('Test');
  });

  it('should call logout endpoint', async () => {
    vi.mocked(api.get).mockReturnValue({} as any);

    await adapter.logout();

    expect(api.get).toHaveBeenCalledWith('auth/logout');
  });
});
