import { LibraryDataStore } from './library-data.store';
import { GetSavedTracksCase } from '../get-saved-tracks.case';
import { SpotifyLibraryAdapter } from '../ext/api/library.adapter';

export class LibraryRootStore {
  public readonly data: LibraryDataStore;
  public readonly getSavedTracksCase: GetSavedTracksCase;

  constructor() {
    this.data = new LibraryDataStore();
    const libraryApi = new SpotifyLibraryAdapter();

    this.getSavedTracksCase = new GetSavedTracksCase(libraryApi, this.data);
  }
}

export const libraryRootStore = new LibraryRootStore();
