import { apiClient } from '@shared/api';
import { AuthApiPort } from './auth.port';
import { User } from '../../domain/user.model';

export interface UserProfileDto {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
}

export class SpotifyAuthAdapter implements AuthApiPort {
  public async getMe(): Promise<User> {
    const data = await apiClient.get('user/me').json<UserProfileDto>();

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
