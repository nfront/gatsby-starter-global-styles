import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
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

// Inject MUI styles at top of head (only below Typography.js)
// Above Styled-Components
// Which gives Styled-Components higher specificity
// Result: Typography.js > MUI > Styled-Components > Inline CSS
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

/** Theme is MUI-based. Uses MUI's createMuiTheme.
 *  MuiThemeProvider applies MUI theme to all MUI components within.
 *  ThemeProvider makes MUI theme available INSIDE all styled-components, via props.theme.
 */

const wrapRootElement = ({ element }) => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <ContextProviderComponent>{element}</ContextProviderComponent>
          </JssProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

const wrapPageElement = ({ element, props }) => {
  return <Layout>{element}</Layout>;
};

// eslint-disable-next-line import/prefer-default-export
export { wrapRootElement, wrapPageElement };
