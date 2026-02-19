import { AuthDataStore } from './auth-data.store';
import { CheckAuthUseCase } from '../check-auth.case';
import { LogoutUseCase } from '../logout.case';
import { SpotifyAuthAdapter } from '../ext/api/auth.adapter';

export class AuthRootStore {
  public readonly data: AuthDataStore;
  public readonly checkAuthUseCase: CheckAuthUseCase;
  public readonly logoutUseCase: LogoutUseCase;

  constructor() {
    this.data = new AuthDataStore();

    const authApi = new SpotifyAuthAdapter();

    this.checkAuthUseCase = new CheckAuthUseCase(authApi, this.data);
    this.logoutUseCase = new LogoutUseCase(authApi, this.data);
  }
}

export const authRootStore = new AuthRootStore();
