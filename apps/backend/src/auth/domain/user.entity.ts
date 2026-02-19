import { Email } from '@libs/ddd';

export interface UserProps {
  id: string;
  displayName: string;
  email: Email;
  avatarUrl?: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  public static create(props: {
    id: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
  }): User {
    return new User({
      ...props,
      email: Email.create(props.email),
    });
  }

  public get id(): string {
    return this.props.id;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get email(): string {
    return this.props.email.toString();
  }

  public get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }
}
