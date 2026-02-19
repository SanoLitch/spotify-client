import { style } from '@vanilla-extract/css';

export const appContainer = style({
  padding: '2rem',
});

export const loadingContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#121212',
});

export const spinner = style({
  width: '40px',
  height: '40px',
  border: '4px solid rgba(29, 185, 84, 0.1)',
  borderLeftColor: '#1db954',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
});

/*
 * We can use global style for animation if needed or just inline it in another way
 * but for simplicity here's a local class.
 * Note: animations are usually defined in a global styles file.
 */
