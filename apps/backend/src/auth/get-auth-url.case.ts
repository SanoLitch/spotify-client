import {
  Inject, Injectable,
} from '@nestjs/common';
import {
  AUTH_PORT, AuthPort,
} from './ext/auth.port';

@Injectable()
export class GetAuthUrlUseCase {
  constructor(
    @Inject(AUTH_PORT)
    private readonly authPort: AuthPort,
  ) {}

  public execute(): string {
    return this.authPort.getAuthUrl();
  }
}
