import {
  Controller, Get, Query, Res, Req, UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedRequest } from './auth.middleware';
import { AuthService } from '../domain/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  public login(@Res() res: Response): void {
    const url = this.authService.getSpotifyAuthorizeUrl();

    return res.redirect(url);
  }

  @Get('callback')
  public async callback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    const tokens = await this.authService.authenticate(code);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: tokens.expires_in * 1000,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days roughly
    });
    return res.redirect(this.configService.getOrThrow<string>('FE_URI'));
  }

  @Get('me')
  public async me(@Req() req: AuthenticatedRequest) {
    if (!req.user || !req.user.accessToken) {
      throw new UnauthorizedException('No access token found');
    }
    return this.authService.getMe(req.user.accessToken);
  }

  @Get('logout')
  public logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send({ message: 'Logged out' });
  }
}
