import {
  IdentityPort, IdentityTokens,
} from '../../domain/identity.port';

export class CookieIdentityAdapter implements IdentityPort {
  public extractTokens(request: any): IdentityTokens | null {
    const accessToken = request.cookies?.['access_token'];
    const refreshToken = request.cookies?.['refresh_token'];

    if (!accessToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken: refreshToken ?? '',
    };
  }
}
