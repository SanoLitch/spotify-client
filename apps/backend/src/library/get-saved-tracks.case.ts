import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from './library.port';

export class GetSavedTracksUseCase {
  constructor(private readonly libraryPort: LibraryPort) {}

  public async execute(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    return this.libraryPort.getSavedTracks(params);
  }
}
