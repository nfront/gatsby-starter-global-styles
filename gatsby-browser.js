import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
// import { ThemeProvider } from 'styled-components';
// import Helmet from 'react-helmet';
import { ContextProviderComponent } from './src/utils/context';

import Layout from './src/layouts/layout';

// MUI theme
import theme from './src/styles/theme';

// import GlobalStyle from './src/styles/createGlobalStyles';

// import GlobalStyleComponent from './src/styles/createGlobalStyles';

// =================================
// CSS / THEME IMPORTS
// =================================

// MUI theme
// import theme from './src/styles/theme';

// const mycomp1 = new GlobalStyleComponent({ theme });
// const mycomp2 = <GlobalStyleComponent />;

// const reactEle = mycomp1.render();

// const tes = <reactEle />;

// Import general global CSS styles
// Importing CSS directly makes its styles globally scoped
// These are added to BOTTOM of head
// Thus, overriding styled-component styles,
// which is what GlobalStyles is.

// Theme based global styles.
// As this file is JS (uses styled-components' createGlobalStyle),
// it allows us to access theme prop from outer ThemeProvider,
// I.e., unlike imported global style sheet,
// this JS has access to theme variables,
// due to outer ThemeProvider component.

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
// MAIN CODE (WRAPROOTELEMENT API)
// =================================

// import './src/styles/normalize.module.scss';

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
/* Theme is MUI-based. Uses MUI's createMuiTheme // Applies MUI theme to all MUI components within */
/* Makes MUI theme available INSIDE styled-components, via props.theme  */

console.log('IN GATSBY-BROWSER.js. process.env:', process.env);

const wrapRootElement = ({ element }) => {
  console.log('IN GATSBY-BROWSER.js wrapRoot. process.env:', process.env);
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <ContextProviderComponent>
              {/* <GlobalStyleComponent whiteText /> */}
              {element}
            </ContextProviderComponent>
          </JssProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <>
      <Layout>{element}</Layout>
      {/* <GlobalStyle whiteColor /> */}
    </>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { wrapRootElement, wrapPageElement };
