import { Injectable, Inject } from '@nestjs/common';
import {
  LibraryPort, GetSavedTracksParams, GetSavedTracksResult,
} from './domain/library.port';

@Injectable()
export class GetSavedTracksCase {
  constructor(
    @Inject('LibraryPort')
    private readonly libraryPort: LibraryPort,
  ) {}

  public async execute(params: GetSavedTracksParams): Promise<GetSavedTracksResult> {
    return this.libraryPort.getSavedTracks(params);
  }
}

