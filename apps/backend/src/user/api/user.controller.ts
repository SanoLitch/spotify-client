import {
  Controller, Get, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
} from '@nestjs/swagger';
import {
  AuthGuard, CurrentUser,
} from '@shared/auth';
import { UserDto } from './user.dto';
import { MeUseCase } from '../me.case';
import { UserMapper } from '../lib/user.mapper';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly meUseCase: MeUseCase) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  public async me(@CurrentUser() currentUser): Promise<UserDto> {
    const { user } = await this.meUseCase.execute(currentUser.accessToken);

    return UserMapper.toDto(user);
  }
}
