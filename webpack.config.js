let webpack = require('webpack');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let inProduction = (process.env.NODE_ENV === 'production');
let BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');

module.exports = {
  entry: {
    main: './src/main.js',
    vendor: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]'
            }
          },
          'img-loader'
        ]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction,
    }),
    new BuildManifestPlugin(),
  ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
