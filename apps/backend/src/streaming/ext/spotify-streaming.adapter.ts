import { Readable } from 'stream';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StreamingPort } from '../domain/streaming.port';
import { SpotifyApiService } from '../../auth/lib/spotify-api.service';

@Injectable()
export class SpotifyStreamingAdapter implements StreamingPort {
  constructor(private readonly spotifyApi: SpotifyApiService) {}

  public async getTrackStream(trackId: string, accessToken: string): Promise<Readable> {
    const track = await this.spotifyApi.getTrack(accessToken, trackId);
    
    let previewUrl = track.preview_url;

    if (!previewUrl) {
      // Use a short silent or beep MP3 from a public source for R&D purposes
      previewUrl = 'https://www.w3schools.com/html/horse.mp3'; 
    }

    return this.spotifyApi.getAudioStream(previewUrl);
  }
}
