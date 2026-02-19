import { User } from './user.entity';

export interface AuthProvider {
  exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }>;
  getProfile(accessToken: string): Promise<User>;
}
