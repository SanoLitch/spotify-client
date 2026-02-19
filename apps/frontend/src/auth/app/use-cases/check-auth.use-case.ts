import { AuthApiPort } from '../../domain/ports/auth-api.port';
import { AuthDataStore } from '../../domain/auth-data.store';

export class CheckAuthUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly authDataStore: AuthDataStore,
  ) {}

  public async execute(): Promise<void> {
    try {
      const user = await this.authApi.getMe();
      this.authDataStore.setUser(user);
    } catch (error) {
      this.authDataStore.clear();
    }
  }
}
