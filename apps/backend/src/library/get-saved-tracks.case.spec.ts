import {
  TrackId, Time,
} from '@libs/ddd';
import { GetSavedTracksCase } from './get-saved-tracks.case';
import { LibraryPort } from './ext/library.port';
import { Track } from './domain/track.entity';
import { TrackMapper } from './lib/track.mapper';

describe('GetSavedTracksCase', () => {
  let useCase: GetSavedTracksCase;
  let libraryPort: jest.Mocked<LibraryPort>;

  beforeEach(() => {
    libraryPort = {
      getSavedTracks: vi.fn(),
    } as any;
    useCase = new GetSavedTracksCase(libraryPort);
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
          id: TrackId.create('1'),
          name: 'Track 1',
          artists: ['Artist 1'],
          albumName: 'Album 1',
          duration: Time.fromMilliseconds(1000),
        }),
      ],
      total: 100,
      limit: 20,
      offset: 0,
    };

    const expected = {
      ...mockResult,
      items: mockResult.items.map(item => TrackMapper.toDto(item)),
    };

    libraryPort.getSavedTracks.mockResolvedValue(mockResult);

    const result = await useCase.execute(params);

    expect(libraryPort.getSavedTracks).toHaveBeenCalledWith(params);
    expect(result).toEqual(expected);
  });
});
