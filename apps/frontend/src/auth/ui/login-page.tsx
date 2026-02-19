import * as styles from './login-page.css';

export const LoginPage = () => {
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
          className={ styles.loginButton }
          onClick={ handleLogin }
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};
