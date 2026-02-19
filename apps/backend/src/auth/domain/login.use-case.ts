import { AuthProvider } from './auth-provider.interface';
import { UserRepository } from './user-repository.interface';
import { User } from './user.entity';

export interface LoginInput {
  code: string;
}

export interface LoginOutput {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class LoginUseCase {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(input: LoginInput): Promise<LoginOutput> {
    const tokens = await this.authProvider.exchangeCodeForTokens(input.code);
    const user = await this.authProvider.getProfile(tokens.accessToken);

    await this.userRepository.save(user);

    return {
      user,
      tokens,
    };
  }
}
