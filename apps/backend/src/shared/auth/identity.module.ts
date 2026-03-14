import {
  Module,
} from '@nestjs/common';
import { CookieIdentityAdapter } from './cookie-identity.adapter';

@Module({
  providers: [
    {
      provide: 'IdentityPort',
      useClass: CookieIdentityAdapter,
    },
  ],
  exports: ['IdentityPort'],
})
export class IdentityModule {}
