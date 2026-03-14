import { SpotifyLibraryApiService } from './spotify-library-api.service';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from '../../domain/library.port';
import { TrackMapper, SpotifyTrackItem } from '../../lib/track.mapper';

export class SpotifyLibraryAdapter implements LibraryPort {
  constructor(private readonly spotifyApi: SpotifyLibraryApiService) {}

  public async getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    const data = await this.spotifyApi.getSavedTracks(params.accessToken, params.limit, params.offset);

    const items = data.items.map((item: SpotifyTrackItem) => TrackMapper.toEntity(item));

    return {
      items,
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  }
}
