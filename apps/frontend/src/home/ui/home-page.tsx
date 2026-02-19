import { observer } from 'mobx-react-lite';
import {
  PageRoute, ROUTES,
} from '@shared/routing';
import { vars } from '@shared/ui/theme.css';
import * as styles from './home-page.css';
import { authRootStore } from '../../auth';
import { logoutButton } from '../../app.css';

export const HomePageView = observer(() => {
  const { user } = authRootStore.data;

  return (
    <div className={ styles.container }>
      <h1 style={ { color: vars.colors.brand } }>Welcome to Spotify Client!</h1>
      {user && (
        <p>
          Logged in as:
          {' '}
          {user.displayName}
        </p>
      )}
      <button
        type="button"
        className={ logoutButton }
        onClick={ () => authRootStore.logoutUseCase.execute() }
      >
        Logout
      </button>
    </div>
  );
});

export const HomePage: PageRoute = {
  route: ROUTES.HOME,
  view: HomePageView,
};
