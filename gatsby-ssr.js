import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { React } from 'react';
// import { Helmet } from 'react-helmet';
// import GlobalStyles from './src/styles/GlobalStyles';

import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { renderToString } from 'react-dom/server';

// MUI theme
import { MuiThemeProvider } from '@material-ui/core/styles';

import GlobalStyleComponent from './src/styles/createGlobalStyles';
// import Helmet from 'react-helmet';

import theme from './src/styles/theme';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const sheet = new ServerStyleSheet();

  const app = () => <StyleSheetManager sheet={sheet.instance}>{bodyComponent}</StyleSheetManager>;
  replaceBodyHTMLString(renderToString(<app />));
  setHeadComponents([sheet.getStyleElement()]);
  console.log('sheet', sheet);
  const styleTags = sheet.getStyleTags();
  console.log('styleTags', styleTags);
};

// const { rules, componentId } = globalStyles.state.globalStyle;

// const myText = "some 'quoted 'text'";

// console.log('myText: ', myText + ' testing');

// const myObj = {
//   p1: myText,
// };

// console.log('myObj: ', myObj.p1);
// console.log('GlobalStyleComponent', GlobalStyleComponent);
const ele = <GlobalStyleComponent whiteFont theme={theme} />;
console.log('ele', ele);

const { props, type } = ele;

const { globalStyle } = type;

console.log('globalStyle', globalStyle);

const { rules, componentId } = globalStyle;

console.log('ID: ', componentId);

// const serverStyleSheet = new ServerStyleSheet();
// console.log('serverStyleSheet: ', serverStyleSheet);
// const { masterSheet } = serverStyleSheet;

// console.log('sss before: ', masterSheet);

// const globalStyleTag = masterSheet.tagMap[componentId];

// console.log('globalStyleTag', globalStyleTag);

// globalStyleTag.insertRules(componentId);

// globalStyle.createStyles(props, masterSheet);

// console.log('sss after: ', masterSheet);

// console.log('sss tags: ', masterSheet.tags);
// console.log('sss tagMap: ', masterSheet.tagMap);
// console.log('sss clones.tags: ', masterSheet.clones);

// console.log('JJJJJ: ', globalStyle);

// GlobalStyleComponent.render();

// let strippedRule;
// let outString = '';
// rules.forEach(rule => {
//   if (typeof rule === 'string') {
//     strippedRule = rule.replace(/^\s+|\s+$/g, '');
//     if (strippedRule.length > 0) outString += strippedRule;
//   }
// });

// const markup = { __html: outString };
// console.log(outString);

// console.log(`GlobalStyle:`, new GlobalStyle());
// console.log(`GlobalStyle rules: ${rules}, componentId: ${componentId}`);

// const ele = <style key="nfront-global-styles" id={componentId} dangerouslySetInnerHTML={markup} />;

// const ele2 = <GlobalStyle whiteText />;

// const foo = ele2;

// console.log(`ele:`, ele);
// console.log(`ele2:`, foo);

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes }, pluginOptions) => {
  // setHeadComponents([ele2]);
};

// Move Typography.js styles to the top of the head section so they're loaded first.
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  // console.log('headComponents:', headComponents);

  replaceHeadComponents(headComponents);
};

export const wrapRootElement = ({ element }) => {
  console.log('IN GATSBY-BROWSER.js wrapRoot. process.env:', process.env);
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          {/* <GlobalStyleComponent whiteText /> */}
          {element}
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};
