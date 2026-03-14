import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { SpotifyStreamingAdapter } from './spotify-streaming.adapter';

describe('SpotifyStreamingAdapter', () => {
  let adapter: SpotifyStreamingAdapter;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as any;
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
      const mockStream = { pipe: jest.fn() };

      httpService.get.mockReturnValueOnce(of({ data: mockTrack } as any));
      httpService.get.mockReturnValueOnce(of({ data: mockStream } as any));

      const result = await adapter.getTrackStream(trackId, accessToken);

      expect(result).toBe(mockStream);
      expect(httpService.get).toHaveBeenCalledTimes(2);
      expect(httpService.get).toHaveBeenCalledWith(`https://api.spotify.com/v1/tracks/${ trackId }`, expect.any(Object));
      expect(httpService.get).toHaveBeenCalledWith(mockTrack.preview_url, expect.any(Object));
    });

    it('should use fallback URL if preview_url is missing', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';
      const mockTrack = { preview_url: null };
      const mockStream = { pipe: jest.fn() };

      httpService.get.mockReturnValueOnce(of({ data: mockTrack } as any));
      httpService.get.mockReturnValueOnce(of({ data: mockStream } as any));

      const result = await adapter.getTrackStream(trackId, accessToken);

      expect(result).toBe(mockStream);
      expect(httpService.get).toHaveBeenCalledWith('https://www.w3schools.com/html/horse.mp3', expect.any(Object));
    });

    it('should throw InternalServerErrorException if track fetch fails', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';

      httpService.get.mockReturnValueOnce(throwError(() => new Error('API Error')));

      await expect(adapter.getTrackStream(trackId, accessToken)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException if audio stream fetch fails', async () => {
      const trackId = 'track-1';
      const accessToken = 'token';
      const mockTrack = { preview_url: 'http://preview.com' };

      httpService.get.mockReturnValueOnce(of({ data: mockTrack } as any));
      httpService.get.mockReturnValueOnce(throwError(() => new Error('Stream Error')));

      await expect(adapter.getTrackStream(trackId, accessToken)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
