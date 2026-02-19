import { apiClient } from '@shared/api';
import { AuthPort } from './auth.port';
import { User } from '../../domain/user.model';

export interface UserProfileDto {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
}

export class SpotifyAuthAdapter implements AuthPort {
  public async getMe(): Promise<User> {
    const data = await apiClient.get('auth/me').json<UserProfileDto>();

    return User.create({
      id: data.id,
      displayName: data.displayName,
      email: data.email,
      avatarUrl: data.avatarUrl,
    });
  }

  public async logout(): Promise<void> {
    await apiClient.get('auth/logout');
  }
}
