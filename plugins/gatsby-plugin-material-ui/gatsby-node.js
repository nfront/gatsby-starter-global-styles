"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPreBootstrap = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _os = _interopRequireDefault(require("os"));

// Write out the gatsby-mui-config module to .cache.
// Happens before webpack starts compiling page.
// .cache is available when gatsby-browser.js and gatsby-ssr.js runs.
// eslint-disable-next-line import/prefer-default-export
var onPreBootstrap = function onPreBootstrap(_ref, pluginOptions) {
  var store = _ref.store;

  var _store$getState = store.getState(),
      program = _store$getState.program;

  var fixPath = function fixPath(module) {
    var newModule = module;

    if (_os.default.platform() === "win32") {
      newModule = module.split("\\").join("\\\\");
    }

    return newModule;
  };

  var module; // Not allowed to specify both pathToStylesProvider and StylesProvider props
  // in gatsby-config.js

  try {
    if (pluginOptions.pathToStylesProvider && pluginOptions.stylesProvider) {
      throw new Error('You specified both pathToStylesProvider and individual StylesProvider props in gatsby-config.js. Do either or, not both...');
    }

    if (pluginOptions.stylesProvider) {
      console.log('pluginOptions.stylesProvider:', pluginOptions.stylesProvider);
      module = "const stylesProviderProps = " + JSON.stringify(pluginOptions.stylesProvider) + ";\n\nexport default stylesProviderProps;\n";
      console.log('module:', module);
    } else if (pluginOptions.pathToStylesProvider) {
      module = "import stylesProviderProps from \"" + (_path.default.isAbsolute(pluginOptions.pathToStylesProvider) ? pluginOptions.pathToStylesProvider : _path.default.join(program.directory, pluginOptions.pathToStylesProvider)) + "\";\nexport default stylesProviderProps;\n";
      module = fixPath(module);
    } else {
      module = "const stylesProviderProps = {\ninjectFirst: true,\n};\n\nexport default stylesProviderProps;\n";
    }

    var dir = __dirname + "/.cache";

    if (!_fs.default.existsSync(dir)) {
      _fs.default.mkdirSync(dir);
    }

    _fs.default.writeFileSync(dir + "/styles-provider-props.js", module);
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }
};

exports.onPreBootstrap = onPreBootstrap;