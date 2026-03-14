import { User } from '../domain/user.entity';
import { UserDto } from '../api/user.dto';
import { SpotifyProfileDto } from '../ext/spotify/spotify-profile.dto';

export class UserMapper {
  public static toDomain(raw: SpotifyProfileDto): User {
    return User.create({
      id: raw.id,
      displayName: raw.display_name,
      email: raw.email,
      avatarUrl: raw.images?.[0]?.url,
    });
  }

  public static toDto(user: User): UserDto {
    return {
      id: user.id.getValue(),
      displayName: user.displayName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  }
}
