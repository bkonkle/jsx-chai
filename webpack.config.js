import webpack from 'webpack'

export default {
  devtool: 'source-map',
  entry: './src/jsx-chai',
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-addons-test-utils': {
      root: 'React.addons.TestUtils',
      commonjs: 'react-addons-test-utils',
      commonjs2: 'react-addons-test-utils',
      amd: 'react-addons-test-utils',
    },
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }],
  },
  output: {
    path: 'dist',
    filename: 'jsx-chai.min.js',
    library: 'jsxChai',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
