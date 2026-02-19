import { apiClient } from '@shared/api';
import { LibraryPort, GetSavedTracksParams, GetSavedTracksResult } from '../../library.port';
import { Track } from '../../domain/track.model';

export interface TrackDto {
  id: string;
  name: string;
  artists: string[];
  albumName: string;
  durationMs: number;
  albumCoverUrl?: string;
}

export interface GetTracksResponseDto {
  items: TrackDto[];
  total: number;
  limit: number;
  offset: number;
}

export class SpotifyLibraryAdapter implements LibraryPort {
  public async getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    const data = await apiClient.get('library/tracks', {
      searchParams: {
        limit: params.limit,
        offset: params.offset,
      },
    }).json<GetTracksResponseDto>();

    return {
      items: data.items.map((dto) => Track.create({
        id: dto.id,
        name: dto.name,
        artists: dto.artists,
        albumName: dto.albumName,
        durationMs: dto.durationMs,
        albumCoverUrl: dto.albumCoverUrl,
      })),
      total: data.total,
    };
  }
}