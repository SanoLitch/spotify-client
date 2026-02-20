import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StreamTrackUseCase } from '../domain/stream-track.use-case';

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
  ): Promise<void> {
    const stream = await this.streamTrackUseCase.execute(trackId);
    
    stream.pipe(res);
  }
}
