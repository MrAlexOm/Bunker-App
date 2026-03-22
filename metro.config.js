const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for "Cannot access 'c' before initialization" error
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
  output: {
    comments: false,
    beautify: false,
  },
};

module.exports = config;
