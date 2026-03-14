import {
  Injectable, Inject,
} from '@nestjs/common';
import { Pageable } from '@libs/types';
import {
  LibraryPort, GetSavedTracksParams, LIBRARY_PORT,
} from './ext/library.port';
import { TrackDto } from './api/get-tracks.dto';
import { TrackMapper } from './lib/track.mapper';

@Injectable()
export class GetSavedTracksCase {
  constructor(
    @Inject(LIBRARY_PORT)
    private readonly libraryPort: LibraryPort,
  ) {}

  public async execute(params: GetSavedTracksParams): Promise<Pageable<TrackDto>> {
    const tracksPage = await this.libraryPort.getSavedTracks(params);

    return {
      items: tracksPage.items.map(track => TrackMapper.toDto(track)),
      offset: tracksPage.offset,
      limit: tracksPage.limit,
      total: tracksPage.total,
    };
  }
}
