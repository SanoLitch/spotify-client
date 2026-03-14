import {
  Controller, Get, Query, Res, Req, UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiQuery, ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedRequest } from './auth.middleware.types';
import { UserDto } from './user.dto';
import { LoginUseCase } from '../login.case';
import { LogoutUseCase } from '../logout.case';
import { MeUseCase } from '../me.case';
import { GetAuthUrlUseCase } from '../get-auth-url.case';
import { UserMapper } from '../lib/user.mapper';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly meUseCase: MeUseCase,
    private readonly getAuthUrlUseCase: GetAuthUrlUseCase,
  ) {}

  @Get('login')
  @ApiOperation({ summary: 'Redirect to Spotify login' })
  public login(@Res() res: Response): void {
    const url = this.getAuthUrlUseCase.execute();

    return res.redirect(url);
  }

  @Get('callback')
  @ApiOperation({ summary: 'Spotify OAuth callback' })
  @ApiQuery({
    name: 'code',
    description: 'Authorization code from Spotify',
  })
  public async callback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    const { tokens } = await this.loginUseCase.execute({ code });

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600 * 1000,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.redirect(this.configService.getOrThrow<string>('FE_URI'));
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  public async me(@Req() req: AuthenticatedRequest): Promise<UserDto> {
    if (!req.user || !req.user.accessToken) {
      throw new UnauthorizedException('No access token found');
    }

    const { user } = await this.meUseCase.execute(req.user.accessToken);

    return UserMapper.toDto(user);
    }
  @Get('logout')
  @ApiOperation({ summary: 'Logout and clear cookies' })
  public async logout(@Res() res: Response) {
    await this.logoutUseCase.execute();
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send({ message: 'Logged out' });
  }
}
