import { FastifyRequest } from 'fastify';

export interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    accessToken: string;
    refreshToken?: string;
  };
}
