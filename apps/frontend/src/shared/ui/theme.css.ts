import {
  createGlobalTheme, createGlobalThemeContract,
} from '@vanilla-extract/css';

export const vars = createGlobalThemeContract({
  colors: {
    brand: 'brand',
    brandHover: 'brand-hover',
    background: 'background',
    surface: 'surface',
    surfaceHover: 'surface-hover',
    text: 'text',
    textSecondary: 'text-secondary',
    error: 'error',
  },
  spacing: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    lg: 'spacing-lg',
    xl: 'spacing-xl',
  },
  borderRadius: {
    sm: 'border-radius-sm',
    md: 'border-radius-md',
    full: 'border-radius-full',
  },
  fontSizes: {
    sm: 'font-size-sm',
    md: 'font-size-md',
    lg: 'font-size-lg',
    xl: 'font-size-xl',
  },
});

createGlobalTheme(':root', vars, {
  colors: {
    brand: '#1db954',
    brandHover: '#1ed760',
    background: '#121212',
    surface: '#181818',
    surfaceHover: '#282828',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    error: '#f15e6c',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    full: '9999px',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
