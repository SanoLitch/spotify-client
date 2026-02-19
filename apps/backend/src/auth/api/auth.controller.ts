import {
  Controller, Get, Query, Res, Req, UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedRequest } from './auth.middleware';
import { LoginUseCase } from '../domain/login.use-case';
import { LogoutUseCase } from '../domain/logout.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Get('login')
  public login(@Res() res: Response): void {
    const clientId = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    const redirectUri = this.configService.getOrThrow<string>('SPOTIFY_REDIRECT_URI');
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
    ].join(' ');
    const authUri = this.configService.getOrThrow<string>('SPOTIFY_AUTH_URI');

    const url = authUri
      .replace('$CLIENT_ID', clientId)
      .replace('$SCOPES', encodeURIComponent(scopes))
      .replace('$REDIRECT_URI', encodeURIComponent(redirectUri));

    return res.redirect(url);
  }

  @Get('callback')
  public async callback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    const { tokens } = await this.loginUseCase.execute({ code });

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      // We don't have expires_in here yet from the domain output, 
      // let's use a default or update domain output if needed.
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
  public async me(@Req() req: AuthenticatedRequest) {
    if (!req.user || !req.user.accessToken) {
      throw new UnauthorizedException('No access token found');
    }
    // We need a GetMeUseCase here to follow the pattern. 
    // For now, let's keep it simple or implement it if it's in the spec.
    // Spec says: Implement Use Cases for "Login", "Logout", and "Refresh Token".
    // "me" probably needs its own use case.
    return { message: 'Not fully implemented with use case yet' };
  }

  @Get('logout')
  public async logout(@Res() res: Response) {
    await this.logoutUseCase.execute();
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send({ message: 'Logged out' });
  }
}