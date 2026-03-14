import { AuthPort } from '../ext/spotify/auth.port';

export class GetAuthUrlUseCase {
  constructor(private readonly authPort: AuthPort) {}

  public execute(): string {
    return this.authPort.getAuthUrl();
  }
}
