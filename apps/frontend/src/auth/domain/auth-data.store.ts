import { makeAutoObservable } from 'mobx';
import { User } from './user.model';

export class AuthDataStore {
  public user: User | null = null;
  public isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: User): void {
    this.user = user;
    this.isAuthenticated = true;
  }

  public clear(): void {
    this.user = null;
    this.isAuthenticated = false;
  }
}
