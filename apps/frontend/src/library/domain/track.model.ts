export interface TrackProps {
  id: string;
  name: string;
  artists: string[];
  albumName: string;
  durationMs: number;
  albumCoverUrl?: string;
}

export class Track {
  private constructor(private readonly props: TrackProps) {}

  public static create(props: TrackProps): Track {
    return new Track(props);
  }

  public get id(): string {
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

  public get durationMs(): number {
    return this.props.durationMs;
  }

  public get albumCoverUrl(): string | undefined {
    return this.props.albumCoverUrl;
  }

  /**
   * Domain behavior: format duration for display (mm:ss)
   */
  public get formattedDuration(): string {
    const minutes = Math.floor(this.props.durationMs / 60000);
    const seconds = Math.floor((this.props.durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    return `${this.artistsString} | ${this.albumName}`;
  }
}