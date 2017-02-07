const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    '<%= namespacelessProjectName %>-variant': path.join(__dirname, 'fixtures', '<%= namespacelessProjectName %>-variant', 'index'),
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'fixtures', '<%= namespacelessProjectName %>-base.html'),
      chunks: ['<%= namespacelessProjectName %>-variant'],
      filename: '<%= namespacelessProjectName %>-variant.html',
    }),
  ],
  postcss: [
    autoprefixer({
      browsers: [
        'ie >= 10',
        'last 2 versions',
        'last 2 android versions',
        'last 2 and_chr versions',
        'iOS >= 8',
      ],
    }),
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.js', '.jsx'],
  },
  sassLoader: {
    data: `@import "${path.resolve('node_modules/terra-legacy-theme/src/terra-legacy-theme.scss')}"; @import "${path.resolve('node_modules/terra-application/src/terra-application.scss')}"; $terra-bidi: true;`,
  },
};
