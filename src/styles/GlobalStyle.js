/* eslint-disable react/no-danger */
import React from 'react';

const GlobalStyle = props => (
  <style
    id="nfrontGlobalStyle.js"
    dangerouslySetInnerHTML={{
      __html: props.global.toString(),
    }}
  />
);

GlobalStyle.displayName = 'GlobalStyle';

module.exports = GlobalStyle;
