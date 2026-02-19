import { Mocked } from 'vitest';
import { LogoutUseCase } from './logout.case';
import { AuthApiPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authApi: Mocked<AuthApiPort>;
  let authDataStore: Mocked<AuthDataStore>;

  beforeEach(() => {
    authApi = {
      getMe: vi.fn(),
      logout: vi.fn(),
    };
    authDataStore = {
      clear: vi.fn(),
      setLoading: vi.fn(),
    };
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
