import { LibraryPort } from './library.port';
import { LibraryDataStore } from './domain/library-data.store';

export class GetSavedTracksCase {
  private readonly LIMIT = 20;

  constructor(
    private readonly libraryApi: LibraryPort,
    private readonly libraryDataStore: LibraryDataStore,
  ) {}

  public async execute(): Promise<void> {
    if (this.libraryDataStore.isLoading || !this.libraryDataStore.hasMore) {
      return;
    }

    this.libraryDataStore.setLoading(true);

    try {
      const result = await this.libraryApi.getSavedTracks({
        limit: this.LIMIT,
        offset: this.libraryDataStore.offset,
      });

      this.libraryDataStore.appendTracks(result.items, result.total);
    } catch (error) {
      console.error('Failed to fetch saved tracks:', error);
    } finally {
      this.libraryDataStore.setLoading(false);
    }
  }
}
