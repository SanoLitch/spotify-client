import {
  Test, TestingModule,
} from '@nestjs/testing';
import {
  TrackId, Time,
} from '@libs/ddd';
import { LibraryController } from './library.controller';
import { GetSavedTracksUseCase } from '../domain/get-saved-tracks.use-case';
import { Track } from '../domain/track.entity';

describe('LibraryController', () => {
  let controller: LibraryController;
  let getSavedTracksUseCase: jest.Mocked<GetSavedTracksUseCase>;

  beforeEach(async () => {
    getSavedTracksUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetSavedTracksUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [
        {
          provide: GetSavedTracksUseCase,
          useValue: getSavedTracksUseCase,
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
          Track.create({
            id: TrackId.create('1'),
            name: 'Track 1',
            artists: ['Artist 1'],
            albumName: 'Album 1',
            duration: Time.fromMilliseconds(1000),
          }),
        ],
        total: 1,
        limit: 20,
        offset: 0,
      };

      getSavedTracksUseCase.execute.mockResolvedValue(mockResult);

      const req = {
        user: { accessToken: 'token' },
      } as any;

      const result = await controller.getTracks(req, 20, 0);

      expect(getSavedTracksUseCase.execute).toHaveBeenCalledWith({
        accessToken: 'token',
        limit: 20,
        offset: 0,
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('1');
    });
  });
});
