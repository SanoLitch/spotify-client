import { ComponentType } from 'react';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

export interface PageRoute {
  route: AppRoute;
  view: ComponentType;
}
