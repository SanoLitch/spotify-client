import { AuthApiPort } from '../../domain/ports/auth-api.port';
import { AuthDataStore } from '../../domain/auth-data.store';

export class LogoutUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly authDataStore: AuthDataStore,
  ) {}

  public async execute(): Promise<void> {
    try {
      await this.authApi.logout();
    } finally {
      this.authDataStore.clear();
    }
  }
}
