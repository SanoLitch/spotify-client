import {
  Controller, Get, Query, Req, UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiQuery, ApiResponse,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '@shared/auth';
import { Pageable } from '@libs/types';
import { TrackDto } from './get-tracks.dto';
import { GetSavedTracksCase } from '../get-saved-tracks.case';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly getSavedTracksUseCase: GetSavedTracksCase) {}

  @Get('tracks')
  @ApiOperation({ summary: 'Get user saved tracks' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 20,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    example: 0,
  })
  @ApiResponse({
    status: 200,
  })
  public async getTracks(
    @Req() req: AuthenticatedRequest,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ): Promise<Pageable<TrackDto>> {
    if (!req.user || !req.user.accessToken) {
      throw new UnauthorizedException('No access token found');
    }

    const result = await this.getSavedTracksUseCase.execute({
      accessToken: req.user.accessToken,
      limit: Number(limit),
      offset: Number(offset),
    });

    return result;
  }
}
