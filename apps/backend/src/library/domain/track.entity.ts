import { TrackId, Time } from '@libs/ddd';

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

  public static create(props: TrackProps): Track {
    return new Track(props);
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
}