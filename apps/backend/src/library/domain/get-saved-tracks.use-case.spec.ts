import { GetSavedTracksUseCase } from './get-saved-tracks.use-case';
import { LibraryPort } from './library.port';
import { Track } from './track.entity';

describe('GetSavedTracksUseCase', () => {
  let useCase: GetSavedTracksUseCase;
  let libraryPort: jest.Mocked<LibraryPort>;

  beforeEach(() => {
    libraryPort = {
      getSavedTracks: jest.fn(),
    };
    useCase = new GetSavedTracksUseCase(libraryPort);
  });

  it('should fetch saved tracks from library port', async () => {
    const params = {
      accessToken: 'token',
      limit: 20,
      offset: 0,
    };
    const mockResult = {
      items: [
        Track.create({
          id: '1',
          name: 'Track 1',
          artists: ['Artist 1'],
          albumName: 'Album 1',
          durationMs: 1000,
        }),
      ],
      total: 100,
      limit: 20,
      offset: 0,
    };

    libraryPort.getSavedTracks.mockResolvedValue(mockResult);

    const result = await useCase.execute(params);

    expect(libraryPort.getSavedTracks).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockResult);
  });
});
