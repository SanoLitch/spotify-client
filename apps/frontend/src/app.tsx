import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { observer } from 'mobx-react-lite';
import { authRootStore } from './auth';
import { router } from '@shared/routing';
import { PlayerView } from './player/ui/player-view';
import * as styles from './app.css';

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
    <>
      <RouterProvider router={ router } />
      <PlayerView />
    </>
  );
});
