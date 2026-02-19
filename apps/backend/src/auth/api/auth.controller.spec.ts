import {
  Test, TestingModule,
} from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../domain/login.use-case';
import { LogoutUseCase } from '../domain/logout.use-case';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let logoutUseCase: jest.Mocked<LogoutUseCase>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    loginUseCase = { execute: jest.fn() } as any;
    logoutUseCase = { execute: jest.fn() } as any;
    configService = { getOrThrow: jest.fn() } as any;

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
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any as Response;

      await controller.logout(res);

      expect(logoutUseCase.execute).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
