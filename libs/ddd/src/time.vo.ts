export class Time {
  private constructor(private readonly ms: number) {
    if (ms < 0) {
      throw new Error('Time value cannot be negative');
    }
  }

  public static fromMilliseconds(ms: number): Time {
    return new Time(ms);
  }

  public getMilliseconds(): number {
    return this.ms;
  }

  /**
   * Returns formatted string in mm:ss format
   */
  public toFormattedString(): string {
    const minutes = Math.floor(this.ms / 60000);
    const seconds = Math.floor((this.ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  public equals(other: Time): boolean {
    return this.ms === other.ms;
  }
}
