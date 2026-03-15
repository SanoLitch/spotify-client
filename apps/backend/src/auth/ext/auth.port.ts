export const AUTH_CLIENT_PORT = 'AUTH_CLIENT_PORT';

export const AUTH_PORT = Symbol.for('AUTH_PORT');

export interface AuthPort {
  getAuthUrl(): string;
  exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }>;
}
