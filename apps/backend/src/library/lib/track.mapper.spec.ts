import { TrackMapper, SpotifyTrackItem } from './track.mapper';
import { Track } from '../domain/track.entity';
import {
  TrackId, Time,
} from '@libs/ddd';

describe('TrackMapper', () => {
  const mockSpotifyItem: SpotifyTrackItem = {
    track: {
      id: 'track-1',
      name: 'Track 1',
      artists: [{ name: 'Artist 1' }],
      album: {
        name: 'Album 1',
        images: [{ url: 'http://example.com/cover.jpg' }],
      },
      duration_ms: 180000,
    },
  };

  const mockTrack = Track.create({
    id: TrackId.create('track-1'),
    name: 'Track 1',
    artists: ['Artist 1'],
    albumName: 'Album 1',
    duration: Time.fromMilliseconds(180000),
    albumCoverUrl: 'http://example.com/cover.jpg',
  });

  describe('toEntity', () => {
    it('should map SpotifyTrackItem to Track entity', () => {
      const result = TrackMapper.toEntity(mockSpotifyItem);

      expect(result).toBeInstanceOf(Track);
      expect(result.id.getValue()).toBe(mockSpotifyItem.track.id);
      expect(result.name).toBe(mockSpotifyItem.track.name);
      expect(result.artists).toEqual(['Artist 1']);
      expect(result.albumName).toBe(mockSpotifyItem.track.album.name);
      expect(result.duration.getMilliseconds()).toBe(mockSpotifyItem.track.duration_ms);
      expect(result.albumCoverUrl).toBe(mockSpotifyItem.track.album.images[0].url);
    });
  });

  describe('toDto', () => {
    it('should map Track entity to TrackDto', () => {
      const result = TrackMapper.toDto(mockTrack);

      expect(result.id).toBe(mockTrack.id.getValue());
      expect(result.name).toBe(mockTrack.name);
      expect(result.artists).toEqual(mockTrack.artists);
      expect(result.albumName).toBe(mockTrack.albumName);
      expect(result.durationMs).toBe(mockTrack.duration.getMilliseconds());
      expect(result.albumCoverUrl).toBe(mockTrack.albumCoverUrl);
    });
  });

  describe('toResponseDto', () => {
    it('should map GetSavedTracksResult to GetTracksResponseDto', () => {
      const mockResult = {
        items: [mockTrack],
        total: 1,
        limit: 20,
        offset: 0,
      };

      const result = TrackMapper.toResponseDto(mockResult);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual(TrackMapper.toDto(mockTrack));
      expect(result.total).toBe(mockResult.total);
      expect(result.limit).toBe(mockResult.limit);
      expect(result.offset).toBe(mockResult.offset);
    });
  });
});
