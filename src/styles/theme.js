import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

// ===========================
// DEFAULT THEME
// Full list: https://material-ui.com/customization/default-theme/#default-theme
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontSize: 14
// primary: indigo,
// secondary: pink,
// error: red,
// ... and many other built-in variables
// ===========================

// ===========================
// CUSTOM VARIABLES
// Add custom varaibles to theme.
// Can be accessed by all children of ThemeProviders
// via prop.themes (as per usual)
// ===========================

// ===========================
// PALETTE CONFIGURATION TOOL:
// https://material-ui.com/style/color/#color-tool
// ===========================

// ===========================
// TYPE (light / dark theme)
// Changes:
// palette.text
// palette.divider
// palette.background
// palette.action
// ===========================

// ===========================
// NESTING
// Themes can be nested, via different providers
// in different parts of app.
// ===========================

const muiTheme = createMuiTheme({
  // breakoint defaults:
  // xs: 0,
  // sm: 600,
  // md: 960,
  // lg: 1280,
  // xl: 1920,
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  mixins: {
    // Default: 56, 48, 64
    // At small screen: 56 high
    // At landscape: 48 high (smallest)
    // At wide screens: 64 high (tallest)
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
  overrides: {
    // overrides modify CSS classes added by MUI
    // Every MUI component class has following naming convention
    // Mui[component name]-[style rule name]-[UUID]
    // Explore: Component API & DevTools

    // [component name] / style sheet names
    MuiTypography: {
      // [style rule names]
      h1: {
        // Some CSS
        marginBottom: '3rem',
      },
      h2: {
        marginBottom: '1rem',
      },
    },
  },
  palette: {
    primary: blue,
    secondary: orange,
    error: red,

    // Default type: light
    // Alt: dark
    // Dark: Changes text color to white etc.
    type: 'light',
    text: {
      // Default 0, 0, 0, 0.87
      // 0.8 is Gatsby theme
      primary: 'rgba(0, 0, 0, 0.8)',
    },
  },
  shape: {
    // Default borderRadius: 4
    // Buttons etc.
    borderRadius: 4,
  },
  spacing: {
    // Default unit: 8
    // I.e. m-2 --> 2*8 = 16px margin
    // Can be array or function
    // Info: https://material-ui.com/system/spacing
    // Horizontal centering: mx="auto"
    unit: 8,
  },
  // Add custom variables exposed to components via theme
  status: {
    // My business variables
    danger: orange[500],
  },
  // Apply properties on all instances of component type
  MuiButtonBase: {
    // Disables button ripple effect at click
    disableRipple: true,
  },
  typography: {
    useNextVariants: true,
    fontFamily: [`"Roboto", "Helvetica", "Arial", "sans-serif"`].join(','),
    // fontWeightMedium: 500,
    h1: {
      // Gatsby theme
      // Default: 6rem
      fontSize: '2.25rem',
      fontFamily: [`"Roboto-Slab", "Roboto", "Helvetica", "Arial", sans-serif"`].join(','),
      color: 'rgba(0, 0, 0, 0.8)',
      // color: blue[500],
      lineHeight: 1.1,
      letterSpacing: 'normal',
    },
    h2: {
      // Default: 6rem
      fontSize: '1.62671rem',
      fontFamily: [`"Roboto-Slab", "Roboto", "Helvetica", "Arial", sans-serif"`].join(','),
      color: 'rgba(0, 0, 0, 0.8)',
      // color: blue[500],
      lineHeight: 1.1,
      letterSpacing: 'normal',
    },
    // body1: {
    //   fontWeight: 400,
    // },
    // subtitle1: {
    //   fontSize: '1rem',
    // },
    // button: {
    //   fontStyle: 'italic',
    // },
  },
});

// MUI DEFAULTS
/*
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
palette: {
  primary: indigo,
  secondary: pink,
  error: red,
  // Used by `getContrastText()` to maximize the contrast between the background and
  // the text.
  contrastThreshold: 3,
  // Used to shift a color's luminance by approximately
  // two indexes within its tonal palette.
  // E.g., shift from Red 500 to Red 300 or Red 700.
  tonalOffset: 0.2,
},
*/

export default muiTheme;
