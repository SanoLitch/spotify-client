import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const row = style({
  display: 'grid',
  gridTemplateColumns: '48px 1fr',
  gap: vars.spacing.md,
  padding: `${ vars.spacing.sm } ${ vars.spacing.md }`,
  alignItems: 'center',
  borderRadius: vars.borderRadius.sm,
  transition: 'background-color 0.2s',
  cursor: 'default',
  ':hover': {
    backgroundColor: vars.colors.surfaceHover,
  },
});

export const cover = style({
  width: '40px',
  height: '40px',
  borderRadius: vars.borderRadius.sm,
  objectFit: 'cover',
});

export const mainInfo = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const titleWrapper = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.spacing.sm,
});

export const title = style({
  fontSize: vars.fontSizes.md,
  fontWeight: 500,
  color: vars.colors.text,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const duration = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  flexShrink: 0,
});

export const metadata = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
