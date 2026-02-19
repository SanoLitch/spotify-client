import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#121212',
});

export const card = style({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  backgroundColor: '#181818',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  color: 'white',
  maxWidth: '400px',
  width: '100%',
});

export const title = style({
  margin: 0,
  fontSize: '2rem',
  fontWeight: 'bold',
});

export const subtitle = style({
  color: '#b3b3b3',
  margin: 0,
});

export const loginButton = style({
  backgroundColor: '#1db954',
  color: 'white',
  border: 'none',
  padding: '0.75rem 2rem',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'transform 0.2s, background-color 0.2s',
  ':hover': {
    backgroundColor: '#1ed760',
    transform: 'scale(1.05)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
});
