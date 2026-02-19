import {
  Navigate, Outlet, RouteObject,
} from 'react-router';
import { observer } from 'mobx-react-lite';
import { ROUTES } from '@shared/routing';
import * as styles from './app.css';
import { authRootStore } from '../auth';
import { LoginPage } from '../auth/ui/login-page';
import { HomePage } from '../home/ui/home-page';

const ProtectedRoute = observer(() => {
  if (authRootStore.data.isLoading) {
    return (
      <div className={ styles.loadingContainer }>
        <div className={ styles.spinner } />
      </div>
    );
  }

  if (!authRootStore.data.isAuthenticated) {
    return <Navigate replace to={ LoginPage.route } />;
  }

  return <Outlet />;
});

export const routes: RouteObject[] = [
  {
    path: LoginPage.route,
    element: <LoginPage.view />,
  },
  {
    path: ROUTES.AUTH_CALLBACK,
    element: <Navigate replace to={ HomePage.route } />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: HomePage.route,
        element: <HomePage.view />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to={ HomePage.route } />,
  },
];
