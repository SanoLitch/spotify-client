import { useEffect } from 'react';
import {
  useNavigate, useSearchParams,
} from 'react-router';
import {
  Box, CircularProgress, Typography,
} from '@mui/material';
import { authStore } from '../model/auth.store';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const expiresIn = searchParams.get('expires_in');

    if (accessToken && refreshToken) {
      authStore.setTokens({
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: Number(expiresIn),
      });
      navigate('/');
    } else {
      // Handle error
      console.error('No tokens found in callback');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"
      color="white"
    >
      <CircularProgress color="success" />
      <Typography mt={ 2 }>Authenticating...</Typography>
    </Box>
  );
};
