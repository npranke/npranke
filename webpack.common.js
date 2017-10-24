const path = require('path') // https://nodejs.org/api/

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = {
    CSS: path.resolve(__dirname, 'static/css'),
    DIST: path.resolve(__dirname, 'static/dist'),
    JS: path.resolve(__dirname, 'static/js'),
}

const commonConfig = {
    entry: {
        app: path.join(paths.JS, 'app.jsx'),
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                include: paths.JS,
                loader: 'babel-loader?cacheDirectory',
            },
            {
                test: /\.css$/,
                include: paths.CSS,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new CleanWebpackPlugin(['static/dist']),
        new ExtractTextPlugin('[name].bundle.css'),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    stats: { children: false },
}

module.exports = commonConfig
