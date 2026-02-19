import { LibraryDataStore } from './library-data.store';

export class LibraryRootStore {
  public readonly data: LibraryDataStore;

  constructor() {
    this.data = new LibraryDataStore();
  }
}

// Note: In a real app, this might be initialized in a central place
export const libraryRootStore = new LibraryRootStore();
