import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryDataStore } from './library-data.store';
import { Track } from './track.model';

describe('LibraryDataStore', () => {
  let store: LibraryDataStore;

  beforeEach(() => {
    store = new LibraryDataStore();
  });

  it('should initialize with empty state', () => {
    expect(store.tracks).toEqual([]);
    expect(store.total).toBe(0);
    expect(store.offset).toBe(0);
    expect(store.isLoading).toBe(false);
    expect(store.hasMore).toBe(true);
  });

  it('should append tracks and update pagination', () => {
    const track = { id: '1' } as Track;
    store.appendTracks([track], 100);

    expect(store.tracks).toEqual([track]);
    expect(store.total).toBe(100);
    expect(store.offset).toBe(1);
    expect(store.hasMore).toBe(true);
  });

  it('should set hasMore to false when all tracks are loaded', () => {
    const track = { id: '1' } as Track;
    store.appendTracks([track], 1);

    expect(store.hasMore).toBe(false);
  });

  it('should clear tracks', () => {
    store.appendTracks([{ id: '1' } as Track], 10);
    store.clear();

    expect(store.tracks).toEqual([]);
    expect(store.offset).toBe(0);
  });
});
