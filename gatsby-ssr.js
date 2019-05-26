import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import Layout from './src/layouts/layout';

// MUI theme
import theme from './src/styles/theme';

// eslint-disable-next-line react/prop-types,react/display-name
const wrapRootElement = ({ element, pathname }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MuiThemeProvider>
  );
};

const wrapPageElement = ({ element, props: { location } }) => {
  console.log('location from gatsby-ssr:', location);
  return <Layout location={location}>{element}</Layout>;
};

export { wrapRootElement, wrapPageElement };
