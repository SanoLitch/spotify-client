import {
  Email, UserId,
} from '@libs/ddd';

export interface UserProps {
  id: UserId;
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
      id: UserId.create(props.id),
      displayName: props.displayName,
      email: Email.create(props.email),
      avatarUrl: props.avatarUrl,
    });
  }

  public get id(): UserId {
    return this.props.id;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get email(): string {
    return this.props.email.getValue();
  }

  public get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }
}
