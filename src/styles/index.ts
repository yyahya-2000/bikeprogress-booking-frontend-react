import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobileVertical: true;
    mobileHorisontal: true;
    tablet: true;
    tabletVertical: true;
    tabletHorisontal: true;
    laptop: true;
    desktop: true;
  }
  interface globalBaseStyles {
    [key: string]: any;
  }
}

export const globalBaseStyles = createTheme({
  palette: {
    primary: {
      main: '#00519E',
      dark: '#213E76',
    },
    secondary: {
      main: '#9F2914',
    },
    success: {
      main: '#57AB27',
    },
    text: {
      primary: '#4D4D4D',
      secondary: '#696A6D',
    },
    grey: {
      50: '#F0F2F4',
      100: '#D1D3D5',
    },
  },
  breakpoints: {
    values: {
      mobileVertical: 320,
      mobileHorisontal: 480,
      tablet: 600,
      tabletVertical: 768,
      tabletHorisontal: 1024,
      laptop: 1280,
      desktop: 1440,
    },
  },
});