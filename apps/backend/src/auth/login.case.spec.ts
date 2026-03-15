import { Mocked } from 'vitest';
import { LoginUseCase } from './login.case';
import { AuthPort } from './ext/auth.port';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authProvider: Mocked<AuthPort>;

  beforeEach(() => {
    authProvider = {
      getAuthUrl: vi.fn(),
      exchangeCodeForTokens: vi.fn(),
    };
    loginUseCase = new LoginUseCase(authProvider);
  });

  it('should authenticate user and save to repository', async () => {
    const code = 'spotify-code';
    const tokens = {
      accessToken: 'at',
      refreshToken: 'rt',
    };

    authProvider.exchangeCodeForTokens.mockResolvedValue(tokens);

    const result = await loginUseCase.execute({ code });

    expect(authProvider.exchangeCodeForTokens).toHaveBeenCalledWith(code);
    expect(result).toEqual({
      tokens,
    });
  });
});
