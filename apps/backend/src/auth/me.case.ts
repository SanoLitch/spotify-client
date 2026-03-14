import { User } from './domain/user.entity';
import { AuthPort } from './ext/spotify/auth.port';

export interface MeOutput {
  user: User;
}

export class MeUseCase {
  constructor(private readonly authPort: AuthPort) {}

  public async execute(accessToken: string): Promise<MeOutput> {
    const user = await this.authPort.getProfile(accessToken);

    return { user };
  }
}
