import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LogoutUseCase } from './logout.case';
import { AuthPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authApi: jest.Mocked<AuthPort>;
  let authDataStore: jest.Mocked<AuthDataStore>;

  beforeEach(() => {
    authApi = {
      getMe: vi.fn(),
      logout: vi.fn(),
    } as any;
    authDataStore = {
      setUser: vi.fn(),
      clear: vi.fn(),
      setLoading: vi.fn(),
    } as any;
    useCase = new LogoutUseCase(authApi, authDataStore);
  });

  it('should call api logout and clear store', async () => {
    await useCase.execute();

    expect(authApi.logout).toHaveBeenCalled();
    expect(authDataStore.clear).toHaveBeenCalled();
    expect(authDataStore.setLoading).toHaveBeenCalledWith(true);
    expect(authDataStore.setLoading).toHaveBeenCalledWith(false);
  });
});