import {
  Inject, Injectable,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import {
  AUTH_PORT, AuthPort,
} from './ext/spotify/auth.port';
import {
  USER_REPOSITORY_PORT, UserRepositoryPort,
} from './ext/storage/user-repository.port';

export interface LoginOutput {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_PORT)
    private readonly authProvider: AuthPort,
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async execute(input: { code: string }): Promise<LoginOutput> {
    const tokens = await this.authProvider.exchangeCodeForTokens(input.code);
    const user = await this.authProvider.getProfile(tokens.accessToken);

    await this.userRepository.save(user);

    return {
      user,
      tokens,
    };
  }
}
