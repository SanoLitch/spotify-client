import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { observer } from 'mobx-react-lite';
import { router } from './router';
import * as styles from './app.css';
import { authRootStore } from '../auth';

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
    <RouterProvider router={ router } />
  );
});
