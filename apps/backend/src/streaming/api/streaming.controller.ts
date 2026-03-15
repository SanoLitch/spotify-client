import {
  Controller, Get, Param, Res, Header,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags, ApiOperation,
} from '@nestjs/swagger';
import {
  AuthGuard, CurrentUser,
} from '@shared/auth';
import { StreamTrackCase } from '../stream-track.case';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamTrackUseCase: StreamTrackCase) {}

  @Get(':trackId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Stream track audio data' })
  @Header('Content-Type', 'audio/mpeg')
  @Header('Transfer-Encoding', 'chunked')
  public async stream(
    @CurrentUser() user,
    @Param('trackId') trackId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const stream = await this.streamTrackUseCase.execute(trackId, user.accessToken);

      stream.on('error', () => {
        if (!res.headersSent) {
          res.status(500).send('Streaming failed');
        }
      });
      stream.pipe(res);
    } catch (error) {
      if (!res.headersSent) {
        const status = error.status || 500;

        res.status(status).send(error.message);
      }
    }
  }
}
