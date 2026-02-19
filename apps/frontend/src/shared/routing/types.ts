import { ComponentType } from 'react';
import { ROUTES } from './routes';

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

export interface PageRoute {
  route: AppRoute;
  view: ComponentType;
}
