"use strict";

exports.__esModule = true;
exports.onRenderBody = exports.wrapRootElement = void 0;

var _styles = require("@material-ui/styles");

// Keep track of sheets for each page
var globalLeak = new Map();

var wrapRootElement = function wrapRootElement(_ref, pluginOptions) {
  var element = _ref.element,
      pathname = _ref.pathname;
  var sheets = new _styles.ServerStyleSheets(pluginOptions.stylesProvider);
  globalLeak.set(pathname, sheets);
  return sheets.collect(element);
};

exports.wrapRootElement = wrapRootElement;

var onRenderBody = function onRenderBody(_ref2) {
  var setHeadComponents = _ref2.setHeadComponents,
      pathname = _ref2.pathname;
  var sheets = globalLeak.get(pathname);

  if (sheets) {
    setHeadComponents([sheets.getStyleElement()]);
    globalLeak.delete(pathname);
  }
};

exports.onRenderBody = onRenderBody;