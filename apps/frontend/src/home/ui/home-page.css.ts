import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const container = style({
  padding: vars.spacing.xl,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.spacing.xl,
});

export const welcomeTitle = style({
  color: vars.colors.brand,
  margin: 0,
});

export const userName = style({
  margin: 0,
  color: vars.colors.textSecondary,
});

export const sectionTitle = style({
  marginBottom: vars.spacing.md,
});