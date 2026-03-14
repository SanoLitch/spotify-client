import { UnauthorizedException } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { AuthenticatedRequest } from './auth.middleware.types';
import { IdentityPort } from '../domain/identity.port';
import { Response, NextFunction } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let identityPort: jest.Mocked<IdentityPort>;

  beforeEach(() => {
    identityPort = {
      extractTokens: jest.fn(),
    };
    middleware = new AuthMiddleware(identityPort);
  });

  it('should extract tokens and set req.user', () => {
    const req = {} as AuthenticatedRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;
    const tokens = { accessToken: 'at', refreshToken: 'rt' };

    identityPort.extractTokens.mockReturnValue(tokens);

    middleware.use(req, res, next);

    expect(req.user).toEqual(tokens);
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if no tokens are found', () => {
    const req = {} as AuthenticatedRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    identityPort.extractTokens.mockReturnValue(null);

    expect(() => middleware.use(req, res, next)).toThrow(UnauthorizedException);
    expect(next).not.toHaveBeenCalled();
  });
});
