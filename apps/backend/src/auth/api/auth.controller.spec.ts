import {
  Test, TestingModule,
} from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../domain/login.use-case';
import { LogoutUseCase } from '../domain/logout.use-case';
import { MeUseCase } from '../domain/me.use-case';
import { User } from '../domain/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let logoutUseCase: jest.Mocked<LogoutUseCase>;
  let meUseCase: jest.Mocked<MeUseCase>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    loginUseCase = { execute: jest.fn() } as unknown as jest.Mocked<LoginUseCase>;
    logoutUseCase = { execute: jest.fn() } as unknown as jest.Mocked<LogoutUseCase>;
    meUseCase = { execute: jest.fn() } as unknown as jest.Mocked<MeUseCase>;
    configService = { getOrThrow: jest.fn() } as unknown as jest.Mocked<ConfigService>;

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
          provide: MeUseCase,
          useValue: meUseCase,
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
      } as unknown as Response;

      await controller.logout(res);

      expect(logoutUseCase.execute).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('me', () => {
    it('should return user info', async () => {
      const user = User.create({
        id: '1',
        displayName: 'Test',
        email: 'test@test.com',
      });

      meUseCase.execute.mockResolvedValue({ user });

      const req = {
        user: { accessToken: 'token' },
      } as any;

      const result = await controller.me(req);

      expect(result.id).toBe('1');
      expect(result.displayName).toBe('Test');
    });
  });
});
