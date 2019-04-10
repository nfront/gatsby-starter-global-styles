// src/utils/typography.js

// options & themes: Typography.js

import Typography from 'typography';
import theme from 'typography-theme-ocean-beach';

// Customize theme

theme.baseFontSize = '16px'; // was 19px.

const typography = new Typography(theme);

// console.log('typography:', typography);

// OR:

// const typography = new Typography({
//   baseFontSize: '18px',
//   baseLineHeight: 1.666,
//   headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
//   bodyFontFamily: ['Georgia', 'serif'],
// });

export default typography;
