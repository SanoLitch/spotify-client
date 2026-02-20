import { Track } from './track.entity';

export interface GetSavedTracksParams {
  accessToken: string;
  limit: number;
  offset: number;
}

export interface GetSavedTracksResult {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
}

export interface LibraryPort {
  getSavedTracks(params: GetSavedTracksParams): Promise<GetSavedTracksResult>;
}
