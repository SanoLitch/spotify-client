import {
  Injectable, NestMiddleware, UnauthorizedException, Inject,
} from '@nestjs/common';
import {
  Response, NextFunction,
} from 'express';
import { AuthenticatedRequest } from './auth.middleware.types';
import {
  IDENTITY_PORT, IdentityPort,
} from './identity.port';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(IDENTITY_PORT)
    private readonly identityPort: IdentityPort,
  ) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const tokens = this.identityPort.extractTokens(req);

    if (!tokens) {
      throw new UnauthorizedException('No access token found');
    }

    req.user = tokens;
    next();
  }
}
