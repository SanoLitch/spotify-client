import { Mocked } from 'vitest';
import {
  HttpClient, HttpClientError,
} from '@libs/http';
import { createMockHttpClient } from '@shared/test';
import { Readable } from 'node:stream';
import { SpotifyStreamingAdapter } from './spotify-streaming.adapter';

describe('SpotifyStreamingAdapter', () => {
  let adapter: SpotifyStreamingAdapter;
  let httpService: Mocked<HttpClient>;

  beforeEach(() => {
    httpService = createMockHttpClient();
    adapter = new SpotifyStreamingAdapter(httpService);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('getTrackStream', () => {
    it('should return audio stream for a track', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';
      const mockTrack = { preview_url: 'http://preview.com' };
      const dummyWebStream = new Blob(['fake-audio-chunk']).stream();

      httpService.api.mockReturnValueOnce(Promise.resolve(mockTrack));
      httpService.api.mockReturnValueOnce(Promise.resolve(dummyWebStream));

      const result = await adapter.getTrackStream(trackId, accessToken);

      expect(result).toBeInstanceOf(Readable);
      expect(httpService.api).toHaveBeenCalledTimes(2);
      expect(httpService.api)
        .toHaveBeenCalledWith(`/v1/tracks/${ trackId }`, expect.any(Object));
      expect(httpService.api).toHaveBeenCalledWith(mockTrack.preview_url, expect.any(Object));
    });

    it('should use fallback URL if preview_url is missing', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';
      const mockTrack = { preview_url: null };
      const dummyWebStream = new Blob(['fake-audio-chunk']).stream();

      httpService.api.mockReturnValueOnce(Promise.resolve(mockTrack));
      httpService.api.mockResolvedValueOnce(dummyWebStream);

      const result = await adapter.getTrackStream(trackId, accessToken);

      expect(result).toBeInstanceOf(Readable);
      expect(httpService.api).toHaveBeenCalledWith('https://www.w3schools.com/html/horse.mp3', expect.any(Object));
    });

    it('should throw InternalServerErrorException if track fetch fails', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';

      httpService.api.mockReturnValue(Promise.reject(new HttpClientError('Not Allowed', 403)));

      await expect(adapter.getTrackStream(trackId, accessToken)).rejects.toThrow('Not Allowed');
    });

    it('should throw InternalServerErrorException if audio stream fetch fails', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';
      const mockTrack = { preview_url: 'http://preview.com' };

      httpService.api.mockReturnValueOnce(Promise.resolve(mockTrack));
      httpService.api.mockReturnValue(Promise.reject(new HttpClientError('Not Allowed', 403)));

      await expect(adapter.getTrackStream(trackId, accessToken)).rejects.toThrow('Not Allowed');
    });
  });
});
