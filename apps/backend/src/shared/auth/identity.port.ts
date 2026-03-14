import { AuthenticatedRequest } from './auth.middleware.types';

export interface IdentityTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface IdentityPort {
  extractTokens(request: AuthenticatedRequest): IdentityTokens | null;
}
