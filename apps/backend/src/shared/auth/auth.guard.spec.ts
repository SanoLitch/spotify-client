import {
  Test, TestingModule,
} from '@nestjs/testing';
import {
  ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import {
  vi, describe, it, expect, beforeEach,
} from 'vitest';
import { AuthGuard } from './auth.guard';
import {
  IDENTITY_PORT, IdentityPort,
} from './identity.port';
import { AuthenticatedRequest } from './auth-guard.types';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let identityPort: IdentityPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: IDENTITY_PORT,
          useValue: {
            extractTokens: vi.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    identityPort = module.get<IdentityPort>(IDENTITY_PORT);
  });

  it('должен возвращать true и устанавливать user в запросе, если токены извлечены', () => {
    // Arrange
    const tokens = {
      accessToken: 'access',
      refreshToken: 'refresh',
    };
    const request = {} as AuthenticatedRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    vi.mocked(identityPort.extractTokens).mockReturnValue(tokens);

    // Act
    const result = guard.canActivate(context);

    // Assert
    expect(result).toBe(true);
    expect(request.user).toEqual(tokens);
    expect(identityPort.extractTokens).toHaveBeenCalledWith(request);
  });

  it('должен выбрасывать UnauthorizedException, если токены не найдены', () => {
    // Arrange
    const request = {} as AuthenticatedRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    vi.mocked(identityPort.extractTokens).mockReturnValue(null);

    // Act & Assert
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(identityPort.extractTokens).toHaveBeenCalledWith(request);
  });
});
