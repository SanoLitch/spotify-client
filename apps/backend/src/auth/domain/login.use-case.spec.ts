import { LoginUseCase } from './login.use-case';
import { AuthProvider } from './auth-provider.interface';
import { UserRepository } from './user-repository.interface';
import { User } from './user.entity';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authProvider: jest.Mocked<AuthProvider>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    authProvider = {
      exchangeCodeForTokens: jest.fn(),
      getProfile: jest.fn(),
    } as any;
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    loginUseCase = new LoginUseCase(authProvider, userRepository);
  });

  it('should authenticate user and save to repository', async () => {
    const code = 'spotify-code';
    const tokens = { accessToken: 'at', refreshToken: 'rt' };
    const user = User.create({
      id: 'spotify-id',
      displayName: 'Test User',
      email: 'test@example.com',
    });

    authProvider.exchangeCodeForTokens.mockResolvedValue(tokens);
    authProvider.getProfile.mockResolvedValue(user);

    const result = await loginUseCase.execute({ code });

    expect(authProvider.exchangeCodeForTokens).toHaveBeenCalledWith(code);
    expect(authProvider.getProfile).toHaveBeenCalledWith(tokens.accessToken);
    expect(userRepository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual({ user, tokens });
  });
});
