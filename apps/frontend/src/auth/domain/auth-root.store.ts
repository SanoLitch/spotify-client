import { AuthDataStore } from './auth-data.store';

export class AuthRootStore {
  public readonly data: AuthDataStore;

  constructor() {
    this.data = new AuthDataStore();
  }
}

export const authRootStore = new AuthRootStore();
