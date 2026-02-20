import { observer } from 'mobx-react-lite';
import {
  PageRoute, ROUTES,
} from '@shared/routing';
import { secondaryButton } from '@shared/ui';
import * as styles from './home-page.css';
import { TrackList } from '../../library/ui/track-list';
import { authRootStore } from '../../auth';

export const HomePageView = observer(() => {
  const { user } = authRootStore.data;

  return (
    <div className={ styles.container }>
      <header className={ styles.header }>
        <div>
          <h1 className={ styles.welcomeTitle }>Welcome to Spotify Client!</h1>
          {user && (
            <p className={ styles.userName }>
              Logged in as:
              {' '}
              {user.displayName}
            </p>
          )}
        </div>
        <button
          type="button"
          className={ secondaryButton }
          onClick={ () => authRootStore.logoutUseCase.execute() }
        >
          Logout
        </button>
      </header>

      <section>
        <h2 className={ styles.sectionTitle }>Your Saved Tracks</h2>
        <TrackList />
      </section>
    </div>
  );
});

export const HomePage: PageRoute = {
  route: ROUTES.HOME,
  view: HomePageView,
};
