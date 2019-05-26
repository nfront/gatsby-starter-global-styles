"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = exports.onInitialClientRender = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/styles");

var _stylesProviderProps = _interopRequireDefault(require("./.cache/styles-provider-props"));

var _jsxFileName = "c:\\Users\\magnusga\\Dev\\gatsby-plugin-material-ui\\src\\gatsby-browser.js";

var onInitialClientRender = function onInitialClientRender() {
  if (process.env.BUILD_STAGE === "develop") {
    return;
  } // Remove the server-side injected CSS.


  var jssStyles = document.querySelector('#jss-server-side');

  if (jssStyles) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}; // Pass through all StlesProvider props


exports.onInitialClientRender = onInitialClientRender;

var wrapRootElement = function wrapRootElement(_ref, pluginOptions) {
  var element = _ref.element;
  return _react.default.createElement(_styles.StylesProvider, (0, _extends2.default)({}, _stylesProviderProps.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }), element);
};

exports.wrapRootElement = wrapRootElement;