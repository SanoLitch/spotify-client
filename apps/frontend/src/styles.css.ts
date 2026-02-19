import { globalStyle, globalKeyframes } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  backgroundColor: '#121212',
  color: '#ffffff',
});

globalStyle('*', {
  boxSizing: 'border-box',
});

globalKeyframes('spin', {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});