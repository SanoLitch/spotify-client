import {
  Test, TestingModule,
} from '@nestjs/testing';
import { Mocked } from 'vitest';
import { IDENTITY_PORT } from '@shared/auth/identity.port';
import { CookieIdentityAdapter } from '@shared/auth/cookie-identity.adapter';
import { LibraryController } from './library.controller';
import { GetSavedTracksCase } from '../get-saved-tracks.case';

describe('LibraryController', () => {
  let controller: LibraryController;
  let getSavedTracksUseCase: Mocked<GetSavedTracksCase>;

  beforeEach(async () => {
    getSavedTracksUseCase = {
      execute: vi.fn(),
    } as unknown as Mocked<GetSavedTracksCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [
        {
          provide: GetSavedTracksCase,
          useValue: getSavedTracksUseCase,
        },
        {
          provide: IDENTITY_PORT,
          useClass: CookieIdentityAdapter,
        },
      ],
    }).compile();

    controller = module.get<LibraryController>(LibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTracks', () => {
    it('should return tracks from use case', async () => {
      const mockResult = {
        items: [
          {
            id: '1',
            name: 'Track 1',
            artists: ['Artist 1'],
            albumName: 'Album 1',
            durationMs: 1000,
          },
        ],
        total: 1,
        limit: 20,
        offset: 0,
      };

      getSavedTracksUseCase.execute.mockResolvedValue(mockResult);

      const user = { accessToken: 'token' };

      const result = await controller.getTracks(20, 0, user);

      expect(getSavedTracksUseCase.execute).toHaveBeenCalledWith({
        accessToken: 'token',
        limit: 20,
        offset: 0,
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('1');
    });

    it('should throw Error if no user', async () => {
      await expect(controller.getTracks(20, 0, null)).rejects.toThrow();
    });
  });
});
