import { Injectable } from '@nestjs/common';
import { Pageable } from '@libs/types';
import {
  HttpClient, InjectApi,
} from '@libs/http';
import { SpotifyTrackItem } from './types';
import type { Track } from '../../domain/track.entity';
import {
  LibraryPort, GetSavedTracksParams,
  LIBRARY_CLIENT_PORT,
} from '../library.port';
import { TrackMapper } from '../../lib/track.mapper';

@Injectable()
export class SpotifyLibraryAdapter implements LibraryPort {
  constructor(
    @InjectApi(LIBRARY_CLIENT_PORT)
    private readonly spotify: HttpClient,
  ) {}

  public async getSavedTracks(params: GetSavedTracksParams): Promise<Pageable<Track>> {
    const response = await this.spotify.api<Pageable<SpotifyTrackItem>>('/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${ params.accessToken }`,
      },
      params: {
        limit: params.limit,
        offset: params.offset,
      },
    });

    const items = response.items.map((item: SpotifyTrackItem) => TrackMapper.toEntity(item));

    return {
      items,
      total: response.total,
      limit: response.limit,
      offset: response.offset,
    };
  }
}
