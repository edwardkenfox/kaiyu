var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    application: './src/javascripts/main.js',
  },
  output: {
    path: '../app/assets/javascripts',
    filename: '[name].js'
  },
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    root: [
      path.join(__dirname, '/src'),
      path.join(__dirname, "bower_components")
    ],
    alias: {
      snapjs: path.join(__dirname, "bower_components/Snap.svg/dist/snap.svg-min.js")
    }
  }
}
