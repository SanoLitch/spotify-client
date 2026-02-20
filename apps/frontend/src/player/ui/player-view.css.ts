import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '90px',
  backgroundColor: vars.colors.surface,
  borderTop: `1px solid ${ vars.colors.surfaceHover }`,
  padding: `0 ${ vars.spacing.md }`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 100,
});

export const trackInfo = style({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
});

export const trackName = style({
  fontSize: vars.fontSizes.md,
  color: vars.colors.text,
  fontWeight: 500,
});

export const artistName = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '40%',
});

export const audio = style({
  width: '100%',
  height: '32px',
});
