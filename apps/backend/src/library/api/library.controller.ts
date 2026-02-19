import {
  Controller, Get, Query, Req, UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../auth/api/auth.middleware';
import { GetSavedTracksUseCase } from '../domain/get-saved-tracks.use-case';

export class TrackDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String] })
  artists: string[];

  @ApiProperty()
  albumName: string;

  @ApiProperty()
  durationMs: number;

  @ApiProperty({ required: false })
  albumCoverUrl?: string;

  @ApiProperty()
  formattedDuration: string;
}

export class GetTracksResponseDto {
  @ApiProperty({ type: [TrackDto] })
  items: TrackDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly getSavedTracksUseCase: GetSavedTracksUseCase) {}

  @Get('tracks')
  @ApiOperation({ summary: 'Get user saved tracks' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiResponse({ status: 200, type: GetTracksResponseDto })
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
        albumName: track.albumName,
        durationMs: track.durationMs,
        albumCoverUrl: track.albumCoverUrl,
        formattedDuration: track.formattedDuration,
      })),
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    };
  }
}