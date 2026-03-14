import { CookieIdentityAdapter } from './cookie-identity.adapter';

describe('CookieIdentityAdapter', () => {
  let adapter: CookieIdentityAdapter;

  beforeEach(() => {
    adapter = new CookieIdentityAdapter();
  });

  it('should extract tokens from cookies', () => {
    const mockRequest = {
      cookies: {
        access_token: 'valid_access_token',
        refresh_token: 'valid_refresh_token',
      },
    };

    const result = adapter.extractTokens(mockRequest);

    expect(result).toEqual({
      accessToken: 'valid_access_token',
      refreshToken: 'valid_refresh_token',
    });
  });

  it('should return null if access_token is missing', () => {
    const mockRequest = {
      cookies: {
        refresh_token: 'valid_refresh_token',
      },
    };

    const result = adapter.extractTokens(mockRequest);

    expect(result).toBeNull();
  });

  it('should return null if cookies are not present', () => {
    const mockRequest = {};

    const result = adapter.extractTokens(mockRequest);

    expect(result).toBeNull();
  });
});
