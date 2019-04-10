// Unlike global CSS style sheets,
// This styled-component has access to theme variables, via props.theme
// Due to it being inside ThemeProvider component

import { createGlobalStyle } from 'styled-components';
import reset from './reset';
import globalStyles from './globalStyles';

// import normStyles from './normalize.module.css';
// import globStyles from './globalStyles.module.scss';

const GlobalStyleComponent = createGlobalStyle`
  ${reset}
  ${globalStyles}
`;

export default GlobalStyleComponent;
