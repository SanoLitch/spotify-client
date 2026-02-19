export class Email {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(email: string): Email {
    return new Email(email);
  }

  public get toString(): string {
    return this.value;
  }

  private validate(email: string): void {
    if (!email.includes('@')) {
      throw new Error('Invalid email address');
    }
  }
}
