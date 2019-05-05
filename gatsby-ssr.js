import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

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

export { wrapRootElement };
