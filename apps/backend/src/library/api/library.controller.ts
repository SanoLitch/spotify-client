import {
  Controller, Get, Query, Req, UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../auth/api/auth.middleware';
import { GetSavedTracksUseCase } from '../domain/get-saved-tracks.use-case';

export interface TrackDto {
  id: string;
  name: string;
  artists: string[];
  album_name: string;
  duration_ms: number;
  album_cover_url?: string;
  formatted_duration: string;
}

export interface GetTracksResponseDto {
  items: TrackDto[];
  total: number;
  limit: number;
  offset: number;
}

@Controller('library')
export class LibraryController {
  constructor(private readonly getSavedTracksUseCase: GetSavedTracksUseCase) {}

  @Get('tracks')
  public async getTracks(
    @Req() req: AuthenticatedRequest,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ): Promise<GetTracksResponseDto> {
    if (!req.user || !req.user.accessToken) {
      throw new UnauthorizedException('No access token found');
    }

    const result = await this.getSavedTracksUseCase.execute({
      accessToken: req.user.accessToken,
      limit: Number(limit),
      offset: Number(offset),
    });

    return {
      items: result.items.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists,
        album_name: track.albumName,
        duration_ms: track.durationMs,
        album_cover_url: track.albumCoverUrl,
        formatted_duration: track.formattedDuration,
      })),
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    };
  }
}
