import {
  describe, it, expect,
} from 'vitest';
import { Track } from './track.model';

describe('Track Model', () => {
  it('should create a valid track instance and expose props', () => {
    const trackData = {
      id: '1',
      name: 'Test Track',
      artists: ['Artist A', 'Artist B'],
      albumName: 'Test Album',
      durationMs: 180000,
      albumCoverUrl: 'https://example.com/cover.png',
    };

    const track = Track.create(trackData);

    expect(track.id.getValue()).toBe(trackData.id);
    expect(track.name).toBe(trackData.name);
    expect(track.artists).toEqual(trackData.artists);
    expect(track.albumName).toBe(trackData.albumName);
    expect(track.durationMs).toBe(trackData.durationMs);
  });

  it('should format duration correctly', () => {
    const track = Track.create({
      id: '1',
      name: 'T',
      artists: ['A'],
      albumName: 'Alb',
      durationMs: 185000, // 3:05
    });

    expect(track.formattedDuration).toBe('3:05');
  });

  it('should combine artists and album for display metadata', () => {
    const track = Track.create({
      id: '1',
      name: 'T',
      artists: ['Artist 1', 'Artist 2'],
      albumName: 'The Album',
      durationMs: 1000,
    });

    expect(track.displayMetadata).toBe('Artist 1, Artist 2 | The Album');
  });
});
