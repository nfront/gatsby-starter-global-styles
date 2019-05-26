import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ContextProviderComponent } from './src/utils/context';

import Layout from './src/layouts/layout';

// MUI theme
import theme from './src/styles/theme';

// =================================
// CONTEXT PROVIDER
// =================================

// ContextProviderComponent ensures all children
// have access to, and can set, contxt data
// So, when rendering a new page, that page will be
// a context consumer and can set context data.
// Context data will be metadata related to current page,
// and will flow into SEO component.
// SEO component cannot be here, however.
// SEO component must be in page components,
// so we know what context data to set.

// =================================
// FIXING CSS INJECTION ORDER
// =================================

// Handled by gatsby-plugin-material-ui

/** Theme is MUI-based. Uses MUI's createMuiTheme.
 *  MuiThemeProvider applies MUI theme to all MUI components within.
 *  ThemeProvider makes MUI theme available INSIDE all styled-components, via props.theme.
 */

const wrapRootElement = ({ element }) => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ContextProviderComponent>{element}</ContextProviderComponent>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

const wrapPageElement = ({ element, props: { location } }) => {
  console.log('location from gatsby-browser:', location);
  return <Layout location={location}>{element}</Layout>;
};

// eslint-disable-next-line import/prefer-default-export
export { wrapRootElement, wrapPageElement };
