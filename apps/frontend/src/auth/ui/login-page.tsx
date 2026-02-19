import { PageRoute, ROUTES } from '@shared/routing';
import { primaryButton } from '@shared/ui';
import * as styles from './login-page.css';

export const LoginPageView = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };

  return (
    <div className={ styles.container }>
      <div className={ styles.card }>
        <h1 className={ styles.title }>Spotify Client</h1>
        <p className={ styles.subtitle }>Please login to continue</p>
        <button
          type="button"
          className={ primaryButton }
          onClick={ handleLogin }
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export const LoginPage: PageRoute = {
  route: ROUTES.LOGIN,
  view: LoginPageView,
};