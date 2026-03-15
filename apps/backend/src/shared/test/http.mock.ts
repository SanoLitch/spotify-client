import { HttpClient } from '@libs/http';
import { Mocked } from 'vitest';

export const createMockHttpClient = (): Mocked<HttpClient> => ({
  api: vi.fn() as any,
});
