const path = require('path');
const webpack = require('webpack');
const Memoryfs = require('memory-fs');
const glob = require('glob');

const files = glob.sync(path.join(__dirname, `/**/*.{js,jsx,ts,tsx}`), {
  ignore: '**/test/index.js',
});

const webpackConfig = files.map((file) => ({
  context: __dirname,
  mode: 'development',
  entry: file,
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: {
          loader: path.resolve(__dirname, '../lib/index.js'),
          options: {},
        },
      },
    ],
  },
}));
const compiler = webpack(webpackConfig);

compiler.outputFileSystem = new Memoryfs();

compiler.run((err, stats) => {
  if (err) console.log(err);
  stats.toJson().children.forEach((item) => {
    console.log('-------------- ' + item.modules[0].id + '----------------');
    console.log(item.modules[0].source);
  });
});
