import { AuthApiPort } from './auth.port';
import { apiClient } from '../../../shared/api/api-client';
import { User } from '../../domain/user.model';

export interface UserProfileDto {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

export class SpotifyAuthAdapter implements AuthApiPort {
  public async getMe(): Promise<User> {
    const data = await apiClient.get('auth/me').json<UserProfileDto>();

    return User.create({
      id: data.id,
      displayName: data.display_name,
      email: data.email,
      avatarUrl: data.images?.[0]?.url,
    });
  }

  public async logout(): Promise<void> {
    await apiClient.get('auth/logout');
  }
}
