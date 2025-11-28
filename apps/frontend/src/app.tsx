import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router';
import { observer } from 'mobx-react-lite';
import {
  Box, CssBaseline, ThemeProvider, createTheme, CircularProgress,
} from '@mui/material';
import { authStore } from './auth/model/auth.store';
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
  if (!authStore.isAuthenticated) {
    return <Navigate replace to="/login" />;
  }
  return <Outlet />;
});

const App = observer(() => {
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  if (authStore.isLoading) {
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
                  {authStore.user && (
                    <p>Logged in as: {authStore.user.display_name}</p>
                  )}
                  <button onClick={ () => authStore.logout() }>Logout</button>
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
