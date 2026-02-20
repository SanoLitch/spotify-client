import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: vars.colors.background,
});

export const card = style({
  padding: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.md,
  backgroundColor: vars.colors.surface,
  borderRadius: vars.borderRadius.md,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  color: vars.colors.text,
  maxWidth: '400px',
  width: '100%',
});

export const title = style({
  margin: 0,
  fontSize: vars.fontSizes.xl,
  fontWeight: 'bold',
});

export const subtitle = style({
  color: vars.colors.textSecondary,
  margin: 0,
});
