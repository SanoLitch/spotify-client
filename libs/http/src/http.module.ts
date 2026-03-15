import {
  DynamicModule,
  Global,
  Module,
} from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpModuleAsyncOptions } from './types';
import { getHttpClientToken } from './utils';

@Global()
@Module({ })
export class HttpModule {
  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    const token = getHttpClientToken(options.name);

    return {
      module: HttpModule,
      imports: options.imports || [],
      providers: [
        {
          provide: token,
          useFactory: async (...args: any[]) => {
            const config = await options.useFactory(...args);

            return new HttpService(token, config);
          },
          inject: options?.inject || [],
        },
      ],
      exports: [token],
    };
  }
}
