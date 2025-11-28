import {
  Box, Button, Typography, Paper,
} from '@mui/material';

export const LoginPage = () => {
  const handleLogin = () => {
    // Редирект на бэкенд для начала OAuth flow
    window.location.href = 'https://localhost:3000/auth/login';
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212" // Spotify Dark
    >
      <Paper
        elevation={ 3 }
        sx={ {
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#181818',
          color: 'white',
        } }
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Spotify Client
        </Typography>
        <Typography variant="body1" color="gray">
          Please login to continue
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={ {
            borderRadius: 50,
            fontWeight: 'bold',
            px: 4,
          } }
          onClick={ handleLogin }
        >
          Login with Spotify
        </Button>
      </Paper>
    </Box>
  );
};
