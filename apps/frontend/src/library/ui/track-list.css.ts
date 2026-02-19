import { style } from '@vanilla-extract/css';
import { vars } from '@shared/ui/theme.css';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  width: '100%',
});

export const header = style({
  display: 'grid',
  gridTemplateColumns: '48px 1fr 1fr 80px',
  gap: vars.spacing.md,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderBottom: `1px solid ${vars.colors.surfaceHover}`,
  color: vars.colors.textSecondary,
  fontSize: vars.fontSizes.sm,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
});

export const sentinel = style({
  height: '20px',
  width: '100%',
});

export const loading = style({
  padding: vars.spacing.md,
  textAlign: 'center',
  color: vars.colors.brand,
});
