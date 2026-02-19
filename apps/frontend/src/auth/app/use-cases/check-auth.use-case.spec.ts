import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CheckAuthUseCase } from './check-auth.use-case';
import { AuthApiPort } from '../../domain/ports/auth-api.port';
import { AuthDataStore } from '../../domain/auth-data.store';
import { User } from '../../domain/user.model';

describe('CheckAuthUseCase', () => {
  let useCase: CheckAuthUseCase;
  let authApi: AuthApiPort;
  let authDataStore: AuthDataStore;

  beforeEach(() => {
    authApi = {
      getMe: vi.fn(),
      logout: vi.fn(),
    };
    authDataStore = {
      setUser: vi.fn(),
      clear: vi.fn(),
    } as any;
    useCase = new CheckAuthUseCase(authApi, authDataStore);
  });

  it('should fetch user and update store on success', async () => {
    const user = { id: '1' } as User;
    vi.mocked(authApi.getMe).mockResolvedValue(user);

    await useCase.execute();

    expect(authApi.getMe).toHaveBeenCalled();
    expect(authDataStore.setUser).toHaveBeenCalledWith(user);
  });

  it('should clear store on failure', async () => {
    vi.mocked(authApi.getMe).mockRejectedValue(new Error('Unauthorized'));

    await useCase.execute();

    expect(authDataStore.clear).toHaveBeenCalled();
  });
});
