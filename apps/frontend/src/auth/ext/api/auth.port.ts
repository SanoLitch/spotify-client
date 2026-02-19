import { User } from '../../domain/user.model';

export interface AuthApiPort {
  getMe(): Promise<User>;
  logout(): Promise<void>;
}
