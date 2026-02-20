import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { GetSavedTracksCase } from './get-saved-tracks.case';
import { LibraryPort } from './library.port';
import { LibraryDataStore } from './domain/library-data.store';
import { Track } from './domain/track.model';

describe('GetSavedTracksCase', () => {
  let useCase: GetSavedTracksCase;
  let libraryApi: jest.Mocked<LibraryPort>;
  let libraryDataStore: jest.Mocked<LibraryDataStore>;

  beforeEach(() => {
    libraryApi = {
      getSavedTracks: vi.fn(),
    } as any;
    libraryDataStore = {
      appendTracks: vi.fn(),
      setLoading: vi.fn(),
      offset: 0,
      hasMore: true,
    } as any;
    useCase = new GetSavedTracksCase(libraryApi, libraryDataStore);
  });

  it('should fetch tracks and update store', async () => {
    const mockResult = {
      items: [{ id: '1' } as Track],
      total: 100,
    };

    libraryApi.getSavedTracks.mockResolvedValue(mockResult);

    await useCase.execute();

    expect(libraryDataStore.setLoading).toHaveBeenCalledWith(true);
    expect(libraryApi.getSavedTracks).toHaveBeenCalledWith({
      limit: 20,
      offset: 0,
    });
    expect(libraryDataStore.appendTracks).toHaveBeenCalledWith(mockResult.items, mockResult.total);
    expect(libraryDataStore.setLoading).toHaveBeenCalledWith(false);
  });

  it('should not fetch if no more tracks', async () => {
    (libraryDataStore as any).hasMore = false;

    await useCase.execute();

    expect(libraryApi.getSavedTracks).not.toHaveBeenCalled();
  });
});
