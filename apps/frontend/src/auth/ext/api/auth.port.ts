import { User } from '../user.model';

export interface AuthApiPort {
  getMe(): Promise<User>;
  logout(): Promise<void>;
}
