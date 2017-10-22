const path = require('path'); // https://nodejs.org/api/

const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'static/dist'),
    JS: path.resolve(__dirname, 'static/js'),
};

const config = {
    entry: {
        app: path.join(paths.JS, 'app.jsx'),
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new CleanWebpackPlugin(['static/dist']),
    ],
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                include: paths.JS,
                loader: 'babel-loader?cacheDirectory',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = config;
