import {
  describe, it, expect,
} from 'vitest';
import { Track } from './track.model';

describe('Track Model', () => {
  it('should create a valid track instance', () => {
    const trackData = {
      id: '1',
      name: 'Test Track',
      artists: ['Artist A'],
      albumName: 'Test Album',
      durationMs: 180000,
      albumCoverUrl: 'https://example.com/cover.png',
      formattedDuration: '3:00',
    };

    const track = Track.create(trackData);

    expect(track.id).toBe(trackData.id);
    expect(track.name).toBe(trackData.name);
    expect(track.artists).toEqual(trackData.artists);
    expect(track.albumName).toBe(trackData.albumName);
    expect(track.formattedDuration).toBe(trackData.formattedDuration);
  });
});
