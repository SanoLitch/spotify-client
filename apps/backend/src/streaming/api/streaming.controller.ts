import {
  Controller, Get, Param, Res, Header, Req,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags, ApiOperation,
} from '@nestjs/swagger';
import { StreamTrackUseCase } from '../domain/stream-track.use-case';
import { AuthenticatedRequest } from '../../auth';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamTrackUseCase: StreamTrackUseCase) {}

  @Get(':trackId')
  @ApiOperation({ summary: 'Stream track audio data' })
  @Header('Content-Type', 'audio/mpeg')
  @Header('Transfer-Encoding', 'chunked')
  public async stream(
    @Param('trackId') trackId: string,
    @Res() res: Response,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    try {
      const accessToken = req.user?.accessToken;

      if (!accessToken) {
        res.status(401).send('Unauthorized');
        return;
      }

      const stream = await this.streamTrackUseCase.execute(trackId, accessToken);

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
