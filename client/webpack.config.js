const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Text Editor'
    }),
  // TODO: Add and configure workbox plugins for a service worker and manifest file.
  //service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    }),
    //manifest.json
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Text Editor',
      short_name: 'T.E',
      description: 'Keep track your information',
      background_color: '#0F111A',
      theme_color: '#0F111A',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    })
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      //add css loader
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //add babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
