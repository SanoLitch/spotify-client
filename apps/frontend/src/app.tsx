import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router';
import { observer } from 'mobx-react-lite';
import { authRootStore } from './auth';
import { LoginPage } from './auth/ui/login-page';
import * as styles from './app.css';

const ProtectedRoute = observer(() => {
  if (authRootStore.data.isLoading) {
    return null;
  }

  if (!authRootStore.data.isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
});

export const App = observer(() => {
  useEffect(() => {
    authRootStore.checkAuthUseCase.execute();
  }, []);

  if (authRootStore.data.isLoading) {
    return (
      <div className={ styles.loadingContainer }>
        <div className={ styles.spinner } />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <LoginPage /> } />

        {/* Redirect old callback path to root just in case */}
        <Route path="/auth/callback" element={ <Navigate replace to="/" /> } />

        <Route element={ <ProtectedRoute /> }>
          <Route
            path="/" element={ (
              <div className={ styles.appContainer }>
                <h1>Welcome to Spotify Client!</h1>
                {authRootStore.data.user && (
                  <p>
                    Logged in as:
                    {authRootStore.data.user.displayName}
                  </p>
                )}
                <button
                  type="button"
                  onClick={ () => authRootStore.logoutUseCase.execute() }
                >
                  Logout
                </button>
              </div>
            ) }
          />
        </Route>

        <Route path="*" element={ <Navigate replace to="/" /> } />
      </Routes>
    </BrowserRouter>
  );
});
