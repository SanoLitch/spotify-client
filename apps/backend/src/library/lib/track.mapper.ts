import {
  TrackId, Time,
} from '@libs/ddd';
import { Track } from '../domain/track.entity';
import { TrackDto, GetTracksResponseDto } from '../api/dtos/get-tracks.dto';
import { GetSavedTracksResult } from '../domain/library.port';

export interface SpotifyTrackItem {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    duration_ms: number;
  };
}

export class TrackMapper {
  public static toEntity(item: SpotifyTrackItem): Track {
    return Track.create({
      id: TrackId.create(item.track.id),
      name: item.track.name,
      artists: item.track.artists.map(a => a.name),
      albumName: item.track.album.name,
      duration: Time.fromMilliseconds(item.track.duration_ms),
      albumCoverUrl: item.track.album.images?.[0]?.url,
    });
  }

  public static toDto(track: Track): TrackDto {
    return {
      id: track.id.getValue(),
      name: track.name,
      artists: track.artists,
      albumName: track.albumName,
      durationMs: track.duration.getMilliseconds(),
      albumCoverUrl: track.albumCoverUrl,
    };
  }

  public static toResponseDto(result: GetSavedTracksResult): GetTracksResponseDto {
    return {
      items: result.items.map(track => this.toDto(track)),
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    };
  }
}
