import { User } from '../domain/user.entity';

export const USER_CLIENT_PORT = 'USER_CLIENT_PORT';

export const USER_PORT = Symbol.for('USER_PORT');

export interface UserPort {
  getProfile(accessToken: string): Promise<User>;
}
