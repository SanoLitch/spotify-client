import { TrackId } from '@libs/ddd';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from '../../domain/library.port';
import { Track } from '../../domain/track.entity';
import { SpotifyApiService } from '../../../auth/lib/spotify-api.service';

export class SpotifyLibraryAdapter implements LibraryPort {
  constructor(private readonly spotifyApi: SpotifyApiService) {}

  public async getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    const data = await this.spotifyApi.getSavedTracks(params.accessToken, params.limit, params.offset);

    const items = data.items.map((item: any) => Track.create({
      id: TrackId.create(item.track.id),
      name: item.track.name,
      artists: item.track.artists.map((a: any) => a.name),
      albumName: item.track.album.name,
      durationMs: item.track.duration_ms,
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
