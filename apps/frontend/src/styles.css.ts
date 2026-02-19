import {
  globalStyle, globalKeyframes,
} from '@vanilla-extract/css';
import { vars } from './shared/ui/theme.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
  fontSize: '16px',
});

globalStyle('*', {
  boxSizing: 'border-box',
});

globalKeyframes('spin', {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});
