const path = require('path');

module.exports = {
  entry: './src/lib.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, 'dist'),
  }
};