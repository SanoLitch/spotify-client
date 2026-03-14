import {
  Inject, Injectable,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import {
  AUTH_PORT, AuthPort,
} from './ext/spotify/auth.port';

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(AUTH_PORT)
    private readonly authPort: AuthPort,
  ) {}

  public async execute(accessToken: string): Promise<{ user: User }> {
    const user = await this.authPort.getProfile(accessToken);

    return { user };
  }
}
