// =========================
// GLOBAL CSS STYLES
// =========================

// Receives props from GlobalStyle component
// implemented in gatsby-browser.js

import { css } from '@nfront/global-styles';

const globalStyle = css`
  body {
    color: ${props => (props.light ? 'white' : 'black')};
    font-family: ${props => props.theme.typography.fontFamily};
  }

  a {
    text-shadow: none;
    background-image: none;
  }
`;

export default globalStyle;
