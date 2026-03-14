import { ApiProperty } from '@nestjs/swagger';

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
}
