import {
  Inject, Injectable,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import {
  USER_PORT, UserPort,
} from './ext/user.port';

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(USER_PORT)
    private readonly userPort: UserPort,
  ) {}

  public async execute(accessToken: string): Promise<{ user: User }> {
    const user = await this.userPort.getProfile(accessToken);

    return { user };
  }
}
