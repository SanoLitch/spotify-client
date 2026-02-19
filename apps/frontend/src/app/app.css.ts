import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const appContainer = style({
  padding: vars.spacing.xl,
});

export const loadingContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: vars.colors.background,
});

export const spinner = style({
  width: '40px',
  height: '40px',
  border: `4px solid ${ vars.colors.surface }`,
  borderLeftColor: vars.colors.brand,
  borderRadius: vars.borderRadius.full,
  animation: 'spin 1s linear infinite',
});
