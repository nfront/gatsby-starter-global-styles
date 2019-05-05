// =========================
// GLOBAL CSS STYLES
// =========================

// Receives props from GlobalStyle component
// implemented in gatsby-browser.js

import { css } from '@nfront/global-styles';

const globalStyle = css`
  .my-class2 {
    margin-bottom: 10rem;
  }

  html {
    background-color: blue;
  }

  body {
    color: ${props => (props.light ? 'white' : 'black')};
    font-family: ${props => props.theme.typography.fontFamily};
  }
`;

export default globalStyle;
