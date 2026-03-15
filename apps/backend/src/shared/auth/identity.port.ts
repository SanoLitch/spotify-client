import { AuthenticatedRequest } from './auth-guard.types';

export interface IdentityTokens {
  accessToken: string;
  refreshToken?: string;
}

export const IDENTITY_PORT = Symbol.for('IDENTITY_PORT');

export interface IdentityPort {
  extractTokens(request: AuthenticatedRequest): IdentityTokens | null;
}
