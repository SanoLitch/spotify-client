import { User } from '../../domain/user.entity';

export interface AuthPort {
  getAuthUrl(): string;
  exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }>;
  getProfile(accessToken: string): Promise<User>;
}
