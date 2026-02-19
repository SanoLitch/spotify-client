import { TrackId } from '@libs/ddd';
import { Track } from './track.entity';

describe('Track Entity', () => {
  it('should create a valid track instance', () => {
    const trackData = {
      id: TrackId.create('track-123'),
      name: 'Test Track',
      artists: ['Artist A', 'Artist B'],
      albumName: 'Test Album',
      durationMs: 180000,
      albumCoverUrl: 'https://example.com/cover.png',
    };

    const track = Track.create(trackData);

    expect(track.id.equals(trackData.id)).toBe(true);
    expect(track.name).toBe(trackData.name);
    expect(track.artists).toEqual(trackData.artists);
    expect(track.albumName).toBe(trackData.albumName);
    expect(track.durationMs).toBe(trackData.durationMs);
    expect(track.albumCoverUrl).toBe(trackData.albumCoverUrl);
  });
});
