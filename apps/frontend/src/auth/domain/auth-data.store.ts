import { makeAutoObservable } from 'mobx';
import { User } from './user.model';

export class AuthDataStore {
  public user: User | null = null;
  public isAuthenticated: boolean = false;
  public isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: User): void {
    this.user = user;
    this.isAuthenticated = true;
    this.isLoading = false;
  }

  public setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public clear(): void {
    this.user = null;
    this.isAuthenticated = false;
    this.isLoading = false;
  }
}
