import { makeAutoObservable } from 'mobx';
import { Track } from './track.model';

export class LibraryDataStore {
  public tracks: Track[] = [];
  public total: number = 0;
  public offset: number = 0;
  public isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public appendTracks(tracks: Track[], total: number): void {
    this.tracks.push(...tracks);
    this.total = total;
    this.offset = this.tracks.length;
  }

  public get hasMore(): boolean {
    if (this.total === 0) return true;
    return this.tracks.length < this.total;
  }

  public clear(): void {
    this.tracks = [];
    this.total = 0;
    this.offset = 0;
    this.isLoading = false;
  }
}
