import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LogoutUseCase } from './logout.case';
import { AuthPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authApi: AuthPort;
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
    useCase = new LogoutUseCase(authApi, authDataStore);
  });

  it('should call api logout and clear store', async () => {
    await useCase.execute();

    expect(authApi.logout).toHaveBeenCalled();
    expect(authDataStore.clear).toHaveBeenCalled();
  });
});