import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a valid user instance', () => {
    const userData = {
      id: 'user-123',
      displayName: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'https://example.com/avatar.png',
    };

    const user = User.create(userData);

    expect(user.id.getValue()).toBe(userData.id);
    expect(user.displayName).toBe(userData.displayName);
    expect(user.email).toBe(userData.email);
    expect(user.avatarUrl).toBe(userData.avatarUrl);
  });

  it('should throw an error if email is invalid', () => {
    const userData = {
      id: 'user-123',
      displayName: 'John Doe',
      email: 'invalid-email',
    };

    expect(() => User.create(userData)).toThrow();
  });
});
