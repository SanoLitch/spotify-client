import {
  describe, it, expect, beforeEach, vi, Mocked,
} from 'vitest';
import { CheckAuthUseCase } from './check-auth.case';
import { AuthApiPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';
import { User } from './domain/user.model';

describe('CheckAuthUseCase', () => {
  let useCase: CheckAuthUseCase;
  let authApi: Mocked<AuthApiPort>;
  let authDataStore: Mocked<AuthDataStore>;

  beforeEach(() => {
    authApi = {
      getMe: vi.fn(),
      logout: vi.fn(),
    };
    authDataStore = {
      setUser: vi.fn(),
      clear: vi.fn(),
      setLoading: vi.fn(),
    };
    useCase = new CheckAuthUseCase(authApi, authDataStore);
  });

  it('should fetch user and update store on success', async () => {
    const user = { id: '1' } as User;

    vi.mocked(authApi.getMe).mockResolvedValue(user);

    await useCase.execute();

    expect(authApi.getMe).toHaveBeenCalled();
    expect(authDataStore.setUser).toHaveBeenCalledWith(user);
    expect(authDataStore.setLoading).toHaveBeenCalledWith(true);
    expect(authDataStore.setLoading).toHaveBeenCalledWith(false);
  });

  it('should clear store on failure', async () => {
    vi.mocked(authApi.getMe).mockRejectedValue(new Error('Unauthorized'));

    await useCase.execute();

    expect(authDataStore.clear).toHaveBeenCalled();
    expect(authDataStore.setLoading).toHaveBeenCalledWith(false);
  });
});
