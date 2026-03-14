export interface IdentityTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IdentityPort {
  extractTokens(request: any): IdentityTokens | null;
}
