import { AuthDataStore } from './auth-data.store';
import { User } from './user.model';

describe('AuthDataStore', () => {
  let store: AuthDataStore;

  beforeEach(() => {
    store = new AuthDataStore();
  });

  it('should initialize with default values', () => {
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBe(null);
    expect(store.isLoading).toBe(true);
  });

  it('should set user and mark as authenticated', () => {
    const user = User.create({
      id: '1',
      displayName: 'Test',
      email: 'test@test.com',
    });
    store.setUser(user);
    expect(store.user).toBe(user);
    expect(store.isAuthenticated).toBe(true);
    expect(store.isLoading).toBe(false);
  });

  it('should clear user on logout', () => {
    const user = User.create({
      id: '1',
      displayName: 'Test',
      email: 'test@test.com',
    });
    store.setUser(user);
    store.clear();
    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
    expect(store.isLoading).toBe(false);
  });
});
