// =========================
// GLOBAL CSS STYLES
// =========================

// Receives props from GlobalStyle component
// implemented in gatsby-browser.js

import { css } from 'styled-components';

const globalStyles = css`
  .my-class2 {
    margin-bottom: 10rem;
  }

  html {
    background-color: blue;
  }

  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }
`;

export default globalStyles;
