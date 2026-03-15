import {
  Controller, Get, Query, Res,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiQuery,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';
import { LoginUseCase } from '../login.case';
import { LogoutUseCase } from '../logout.case';
import { GetAuthUrlUseCase } from '../get-auth-url.case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getAuthUrlUseCase: GetAuthUrlUseCase,
  ) {}

  @Get('login')
  @ApiOperation({ summary: 'Redirect to OAuth login' })
  public login(@Res() res: FastifyReply) {
    const url = this.getAuthUrlUseCase.execute();

    return res.status(302).redirect(url);
  }

  @Get('callback')
  @ApiOperation({ summary: 'OAuth callback' })
  @ApiQuery({
    name: 'code',
    description: 'Authorization code',
  })
  public async callback(@Query('code') code: string, @Res({ passthrough: true }) res: FastifyReply): Promise<void> {
    const { tokens } = await this.loginUseCase.execute({ code });

    res.setCookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600 * 1000,
      path: '/',
    });

    res.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return res.status(302).redirect(this.configService.getOrThrow<string>('FE_URI'));
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout and clear cookies' })
  public async logout(@Res({ passthrough: true }) res: FastifyReply) {
    await this.logoutUseCase.execute();
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send({ message: 'Logged out' });
  }
}
