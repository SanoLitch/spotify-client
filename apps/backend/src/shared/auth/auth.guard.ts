import {
  Injectable, CanActivate, ExecutionContext, UnauthorizedException,
  Inject,
} from '@nestjs/common';
import {
  IDENTITY_PORT, IdentityPort,
} from './identity.port';
import { AuthenticatedRequest } from './auth-guard.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(IDENTITY_PORT)
    private readonly identityPort: IdentityPort,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const tokens = this.identityPort.extractTokens(request);

    if (!tokens) {
      throw new UnauthorizedException();
    }
    request.user = tokens;

    return true;
  }
}
