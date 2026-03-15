import { Inject } from '@nestjs/common';
import { getHttpClientToken } from './utils';

export const InjectApi = (name: string) => Inject(getHttpClientToken(name));
