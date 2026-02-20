import {
  TrackId, Time,
} from '@libs/ddd';

export interface TrackProps {
  id: TrackId;
  name: string;
  artists: string[];
  albumName: string;
  duration: Time;
  albumCoverUrl?: string;
}

export class Track {
  private constructor(private readonly props: TrackProps) {}

  public static create(props: {
    id: string;
    name: string;
    artists: string[];
    albumName: string;
    durationMs: number;
    albumCoverUrl?: string;
  }): Track {
    return new Track({
      id: TrackId.create(props.id),
      name: props.name,
      artists: props.artists,
      albumName: props.albumName,
      duration: Time.fromMilliseconds(props.durationMs),
      albumCoverUrl: props.albumCoverUrl,
    });
  }

  public get id(): TrackId {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get artists(): string[] {
    return this.props.artists;
  }

  public get albumName(): string {
    return this.props.albumName;
  }

  public get duration(): Time {
    return this.props.duration;
  }

  public get albumCoverUrl(): string | undefined {
    return this.props.albumCoverUrl;
  }

  /**
   * Domain behavior: delegate formatting to Time VO
   */
  public get formattedDuration(): string {
    return this.props.duration.toFormattedString();
  }

  /**
   * Domain behavior: format artists as a single string
   */
  public get artistsString(): string {
    return this.props.artists.join(', ');
  }

  /**
   * Domain behavior: get combined secondary metadata
   */
  public get displayMetadata(): string {
    return `${ this.artistsString } | ${ this.albumName }`;
  }
}
