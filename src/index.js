const babel = require('@babel/core');
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  let options = loaderUtils.getOptions(this);
  const { code } = babel.transformSync(source, {
    presets: [
      ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    ],
    plugins: [['async-captures', options]],
    sourceType: 'module',
  });
  return code;
};
