import { Logger } from '@nestjs/common';
import {
  ofetch, $Fetch,
} from 'ofetch';
import {
  HttpClient, HttpClientError, HttpModuleOptions,
} from './types';

export class HttpService implements HttpClient {
  public readonly api: $Fetch;

  private readonly logger: Logger;

  constructor(clientName: string, options: HttpModuleOptions) {
    this.logger = new Logger(clientName);

    this.api = ofetch.create({
      baseURL: options.baseURL,
      headers: options.headers ?? {
        Accept: 'application/json',
      },
      onRequest: ({
        request, options,
      }) => {
        this.logger.debug(`[REQ] ${ options.method || 'GET' } ${ request }`, options);
      },
      onResponseError: ({
        request, response,
      }) => {
        const errorMessage = response._data?.message || response._data?.error || 'External API Error';

        this.logger.error(`[ERR] ${ request } failed with status ${ response.status }`, errorMessage);

        throw new HttpClientError(
          {
            message: `External request to ${ request } failed`,
            details: errorMessage,
          },
          response.status || 500,
        );
      },
    });
  }
}
