import { useEffect } from 'react';
import {
  useNavigate, useSearchParams,
} from 'react-router';
import { authRootStore } from '../domain/auth-root.store';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    /*
     * Note: The logic here might need to match how the backend sends tokens
     * This is just a placeholder to remove MUI
     */
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      // logic...
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white',
    } }
    >
      <div style={ { color: '#1db954' } }>Authenticating...</div>
    </div>
  );
};
