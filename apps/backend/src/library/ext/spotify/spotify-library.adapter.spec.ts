import { Mocked } from 'vitest';
import {
  HttpClient, HttpClientError,
} from '@libs/http';
import { createMockHttpClient } from '@shared/test';
import { SpotifyLibraryAdapter } from './spotify-library.adapter';
import { Track } from '../../domain/track.entity';

describe('SpotifyLibraryAdapter', () => {
  let adapter: SpotifyLibraryAdapter;
  let httpService: Mocked<HttpClient>;

  beforeEach(() => {
    httpService = createMockHttpClient();
    adapter = new SpotifyLibraryAdapter(httpService);
  });

  it('should fetch saved tracks and map to domain entities', async () => {
    const params = {
      accessToken: 'token',
      limit: 2,
      offset: 0,
    };

    const mockSpotifyResponse = {
      items: [
        {
          track: {
            id: 'id1',
            name: 'Track 1',
            artists: [{ name: 'Artist 1' }],
            album: {
              name: 'Album 1',
              images: [{ url: 'cover1.png' }],
            },
            duration_ms: 1000,
          },
        },
        {
          track: {
            id: 'id2',
            name: 'Track 2',
            artists: [{ name: 'Artist 2' }, { name: 'Artist 3' }],
            album: {
              name: 'Album 2',
              images: [{ url: 'cover2.png' }],
            },
            duration_ms: 2000,
          },
        },
      ],
      total: 100,
      limit: 2,
      offset: 0,
    };

    httpService.api.mockReturnValue(Promise.resolve(mockSpotifyResponse));

    const result = await adapter.getSavedTracks(params);

    expect(httpService.api).toHaveBeenCalledWith(
      '/v1/me/tracks',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer token',
        },
        params: {
          limit: 2,
          offset: 0,
        },
      }),
    );
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toBeInstanceOf(Track);
    expect(result.items[0].id.getValue()).toBe('id1');
    expect(result.items[0].artists).toEqual(['Artist 1']);
    expect(result.items[0].albumCoverUrl).toBe('cover1.png');
    expect(result.total).toBe(100);
  });

  it('should throw InternalServerErrorException on API error', async () => {
    const params = {
      accessToken: 'token',
      limit: 2,
      offset: 0,
    };

    httpService.api.mockReturnValue(Promise.reject(new HttpClientError('Not Allowed', 403)));

    await expect(adapter.getSavedTracks(params)).rejects.toThrow('Not Allowed');
  });
});
