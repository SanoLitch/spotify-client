import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router';
import { observer } from 'mobx-react-lite';
import {
  Box, CssBaseline, ThemeProvider, createTheme, CircularProgress,
} from '@mui/material';
import { authRootStore } from './auth';
import { LoginPage } from './auth/ui/login-page';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1db954', // Spotify Green
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
  },
});

const ProtectedRoute = observer(() => {
  if (!authRootStore.data.isAuthenticated) {
    return <Navigate replace to="/login" />;
  }
  return <Outlet />;
});

const App = observer(() => {
  useEffect(() => {
    authRootStore.checkAuthUseCase.execute();
  }, []);

  if (authRootStore.data.isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#121212"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage /> } />

          {/* Redirect old callback path to root just in case */}
          <Route path="/auth/callback" element={ <Navigate replace to="/" /> } />

          <Route element={ <ProtectedRoute /> }>
            <Route
              path="/" element={ (
                <Box p={ 4 }>
                  <h1>Welcome to Spotify Client!</h1>
                  {authRootStore.data.user && (
                    <p>
                      Logged in as:
                      {authRootStore.data.user.displayName}
                    </p>
                  )}
                  <button onClick={ () => authRootStore.logoutUseCase.execute() }>Logout</button>
                </Box>
              ) }
            />
          </Route>

          <Route path="*" element={ <Navigate replace to="/" /> } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;