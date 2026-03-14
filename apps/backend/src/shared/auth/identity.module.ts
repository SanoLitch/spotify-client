import {
  Module,
} from '@nestjs/common';
import { CookieIdentityAdapter } from './cookie-identity.adapter';
import { IDENTITY_PORT } from './identity.port';

@Module({
  providers: [
    {
      provide: IDENTITY_PORT,
      useClass: CookieIdentityAdapter,
    },
  ],
  exports: [IDENTITY_PORT],
})
export class IdentityModule {}
