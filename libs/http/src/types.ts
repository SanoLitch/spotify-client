import {
  HttpException, ModuleMetadata,
} from '@nestjs/common';
import {
  $Fetch, FetchError,
} from 'ofetch';

export interface HttpModuleOptions {
  baseURL: string;
  headers?: Record<string, string>;
}

export interface HttpModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name: string;
  useFactory?: (...args: any[]) => Promise<HttpModuleOptions> | HttpModuleOptions;
  inject?: any[];
}

export interface HttpClient {
  api: $Fetch;
}

export class HttpClientError extends HttpException {}
