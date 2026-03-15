import {
  Test, TestingModule,
} from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Mocked } from 'vitest';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../login.case';
import { LogoutUseCase } from '../logout.case';
import { GetAuthUrlUseCase } from '../get-auth-url.case';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: Mocked<LoginUseCase>;
  let logoutUseCase: Mocked<LogoutUseCase>;
  let getAuthUrlUseCase: Mocked<GetAuthUrlUseCase>;
  let configService: Mocked<ConfigService>;

  beforeEach(async () => {
    loginUseCase = { execute: vi.fn() } as unknown as Mocked<LoginUseCase>;
    logoutUseCase = { execute: vi.fn() } as unknown as Mocked<LogoutUseCase>;
    getAuthUrlUseCase = { execute: vi.fn() } as unknown as Mocked<GetAuthUrlUseCase>;
    configService = { getOrThrow: vi.fn() } as unknown as Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: loginUseCase,
        },
        {
          provide: LogoutUseCase,
          useValue: logoutUseCase,
        },
        {
          provide: GetAuthUrlUseCase,
          useValue: getAuthUrlUseCase,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('logout', () => {
    it('should clear cookies and return 200', async () => {
      const res = {
        clearCookie: vi.fn(),
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as Response;

      await controller.logout(res);

      expect(logoutUseCase.execute).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
