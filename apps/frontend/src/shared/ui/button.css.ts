import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const baseButton = style({
  border: 'none',
  borderRadius: vars.borderRadius.full,
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'transform 0.2s, background-color 0.2s',
  ':active': {
    transform: 'scale(0.95)',
  },
});

export const primaryButton = style([baseButton, {
  backgroundColor: vars.colors.brand,
  color: vars.colors.text,
  padding: `${vars.spacing.sm} ${vars.spacing.xl}`,
  fontSize: vars.fontSizes.md,
  ':hover': {
    backgroundColor: vars.colors.brandHover,
    transform: 'scale(1.05)',
  },
}]);

export const secondaryButton = style([baseButton, {
  backgroundColor: vars.colors.surface,
  color: vars.colors.text,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  fontSize: vars.fontSizes.sm,
  borderRadius: vars.borderRadius.sm,
  ':hover': {
    backgroundColor: vars.colors.surfaceHover,
  },
}]);
