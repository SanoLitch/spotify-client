import {
  TrackId, Time,
} from '@libs/ddd';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from '../../domain/library.port';
import { Track } from '../../domain/track.entity';
import { SpotifyLibraryApiService } from './spotify-library-api.service';

interface SpotifyTrackItem {
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

export class SpotifyLibraryAdapter implements LibraryPort {
  constructor(private readonly spotifyApi: SpotifyLibraryApiService) {}

  public async getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    const data = await this.spotifyApi.getSavedTracks(params.accessToken, params.limit, params.offset);

    const items = data.items.map((item: SpotifyTrackItem) => Track.create({
      id: TrackId.create(item.track.id),
      name: item.track.name,
      artists: item.track.artists.map(a => a.name),
      albumName: item.track.album.name,
      duration: Time.fromMilliseconds(item.track.duration_ms),
      albumCoverUrl: item.track.album.images?.[0]?.url,
    }));

    return {
      items,
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  }
}
