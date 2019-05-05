// Unlike global CSS style sheets,
// This styled-component has access to theme variables, via props.theme
// Due to it being inside ThemeProvider component

import { createGlobalStyle } from '@nfront/global-styles';
import reset from './reset';
import globalStyle from './globalStyle';

const GlobalStyleComponent = createGlobalStyle`
  ${reset}
  ${globalStyle}
`;

export default GlobalStyleComponent;
