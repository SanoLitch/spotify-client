import {
  Injectable, InternalServerErrorException, Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from '../library.port';
import {
  TrackMapper, SpotifyTrackItem,
} from '../../lib/track.mapper';

@Injectable()
export class SpotifyLibraryAdapter implements LibraryPort {
  private readonly logger = new Logger(SpotifyLibraryAdapter.name);

  constructor(private readonly httpService: HttpService) {}

  public async getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${ params.accessToken }`,
          },
          params: {
            limit: params.limit,
            offset: params.offset,
          },
        }),
      );

      const data = response.data;
      const items = data.items.map((item: SpotifyTrackItem) => TrackMapper.toEntity(item));

      return {
        items,
        total: data.total,
        limit: data.limit,
        offset: data.offset,
      };
    } catch (error) {
      this.logger.error('Spotify Library Error', {
        error: error?.response?.data || error.message,
      });
      throw new InternalServerErrorException('Failed to fetch saved tracks');
    }
  }
}
