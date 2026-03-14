import {
  Injectable, Inject,
} from '@nestjs/common';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult, LIBRARY_PORT,
} from './ext/library.port';

@Injectable()
export class GetSavedTracksCase {
  constructor(
    @Inject(LIBRARY_PORT)
    private readonly libraryPort: LibraryPort,
  ) {}

  public async execute(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    return this.libraryPort.getSavedTracks(params);
  }
}
