import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import {
  HttpClient, InjectApi,
} from '@libs/http';
import { SpotifyProfileDto } from './spotify-profile.dto';
import {
  UserPort, USER_CLIENT_PORT,
} from '../user.port';
import { User } from '../../domain/user.entity';
import { UserMapper } from '../../lib/user.mapper';

@Injectable()
export class SpotifyUserAdapter implements UserPort {
  private readonly logger = new Logger(SpotifyUserAdapter.name);

  constructor(
    @InjectApi(USER_CLIENT_PORT)
    private readonly spotify: HttpClient,
  ) {}

  public async getProfile(accessToken: string): Promise<User> {
    try {
      const response = await this.spotify.api<SpotifyProfileDto>('/v1/me', {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
        },
      });

      return UserMapper.toEntity(response);
    } catch (error) {
      this.logger.error('Spotify Profile Error', {
        error: error?.response?.data || error.message,
      });
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }
}
