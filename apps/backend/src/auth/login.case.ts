import {
  Inject, Injectable,
} from '@nestjs/common';
import {
  AUTH_PORT, AuthPort,
} from './ext/auth.port';

export interface LoginOutput {
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
  ) {}

  public async execute(input: { code: string }): Promise<LoginOutput> {
    const tokens = await this.authProvider.exchangeCodeForTokens(input.code);

    return {
      tokens,
    };
  }
}
