import { Track } from './track.entity';

describe('Track Entity', () => {
  it('should create a valid track instance', () => {
    const trackData = {
      id: 'track-123',
      name: 'Test Track',
      artists: ['Artist A', 'Artist B'],
      albumName: 'Test Album',
      durationMs: 180000,
      albumCoverUrl: 'https://example.com/cover.png',
    };

    const track = Track.create(trackData);

    expect(track.id).toBe(trackData.id);
    expect(track.name).toBe(trackData.name);
    expect(track.artists).toEqual(trackData.artists);
    expect(track.albumName).toBe(trackData.albumName);
    expect(track.durationMs).toBe(trackData.durationMs);
    expect(track.albumCoverUrl).toBe(trackData.albumCoverUrl);
  });

  it('should format duration as mm:ss', () => {
    const track = Track.create({
      id: '1',
      name: 'T',
      artists: ['A'],
      albumName: 'Alb',
      durationMs: 185000, // 3:05
    });

    expect(track.formattedDuration).toBe('3:05');
  });

  it('should handle durations longer than an hour', () => {
    const track = Track.create({
      id: '1',
      name: 'T',
      artists: ['A'],
      albumName: 'Alb',
      durationMs: 3661000, // 1:01:01
    });

    expect(track.formattedDuration).toBe('61:01'); // Keeping it simple per Spotify's usual list format
  });
});
