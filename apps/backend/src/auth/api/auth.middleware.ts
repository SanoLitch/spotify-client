import {
  Injectable, NestMiddleware, UnauthorizedException,
} from '@nestjs/common';
import {
  Request, Response, NextFunction,
} from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    if (!accessToken) {
      throw new UnauthorizedException('No access token found');
    }
    req.user = {
      accessToken,
      refreshToken,
    };
    next();
  }
}
