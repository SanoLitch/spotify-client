import { AuthPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';

export class LogoutUseCase {
  constructor(
    private readonly authApi: AuthPort,
    private readonly authDataStore: AuthDataStore,
  ) {}

  public async execute(): Promise<void> {
    this.authDataStore.setLoading(true);
    try {
      await this.authApi.logout();
    } finally {
      this.authDataStore.clear();
      this.authDataStore.setLoading(false);
    }
  }
}
