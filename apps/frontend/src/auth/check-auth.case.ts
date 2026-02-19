import { AuthApiPort } from './ext/api/auth.port';
import { AuthDataStore } from './domain/auth-data.store';

export class CheckAuthUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly authDataStore: AuthDataStore,
  ) {}

  public async execute(): Promise<void> {
    this.authDataStore.setLoading(true);
    try {
      const user = await this.authApi.getMe();

      this.authDataStore.setUser(user);
    } catch (error) {
      this.authDataStore.clear();
    } finally {
      this.authDataStore.setLoading(false);
    }
  }
}
