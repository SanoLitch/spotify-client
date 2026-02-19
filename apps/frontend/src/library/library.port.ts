import { Track } from './domain/track.model';

export interface GetSavedTracksParams {
  limit: number;
  offset: number;
}

export interface GetSavedTracksResult {
  items: Track[];
  total: number;
}

export interface LibraryPort {
  getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult>;
}
