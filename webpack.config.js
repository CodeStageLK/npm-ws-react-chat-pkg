const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/ChatApp.js',
  output: {
    path: path.resolve('dist'),
    filename: 'ChatApp.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
  },
};
