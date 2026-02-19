import { User } from './user.entity';
import { AuthPort } from '../ext/spotify/auth.port';
import { UserRepositoryPort } from '../ext/storage/user-repository.port';

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
    private readonly authProvider: AuthPort,
    private readonly userRepository: UserRepositoryPort,
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
