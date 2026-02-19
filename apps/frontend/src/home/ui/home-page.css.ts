import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const container = style({
  padding: vars.spacing.xl,
});

export const logoutButton = style({
  backgroundColor: vars.colors.surface,
  color: vars.colors.text,
  border: 'none',
  padding: `${ vars.spacing.sm } ${ vars.spacing.md }`,
  borderRadius: vars.borderRadius.sm,
  cursor: 'pointer',
  marginTop: vars.spacing.md,
  ':hover': {
    backgroundColor: vars.colors.surfaceHover,
  },
});
