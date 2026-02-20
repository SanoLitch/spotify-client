export abstract class Id {
  protected constructor(protected readonly value: string) {
    if (!value) {
      throw new Error('Id value cannot be empty');
    }
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Id): boolean {
    return this.constructor === other.constructor && this.value === other.value;
  }

  public getValue(): string {
    return this.value;
  }
}

export class UserId extends Id {
  public static create(value: string): UserId {
    return new UserId(value);
  }
}

export class TrackId extends Id {
  public static create(value: string): TrackId {
    return new TrackId(value);
  }
}

export class ArtistId extends Id {
  public static create(value: string): ArtistId {
    return new ArtistId(value);
  }
}
