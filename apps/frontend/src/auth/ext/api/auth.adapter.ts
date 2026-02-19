import { AuthPort } from './auth.port';
import { api } from '../../../ext/core/api';
import { User } from '../../domain/user.model';

export interface UserProfileDto {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

export class SpotifyAuthAdapter implements AuthPort {
  public async getMe(): Promise<User> {
    const data = await api.get('auth/me').json<UserProfileDto>();

    return User.create({
      id: data.id,
      displayName: data.display_name,
      email: data.email,
      avatarUrl: data.images?.[0]?.url,
    });
  }

  public async logout(): Promise<void> {
    await api.get('auth/logout');
  }
}
