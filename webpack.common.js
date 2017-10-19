const path = require('path'); // https://nodejs.org/api/

const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'static/dist'),
  JS: path.resolve(__dirname, 'static/js'),
};

const config = {
    entry: {
        app: path.join(paths.JS, 'app.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new CleanWebpackPlugin(['static/dist']),
    ],
};

module.exports = config;
