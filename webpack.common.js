const path = require('path') // https://nodejs.org/api/

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = {
    CSS: path.resolve(__dirname, 'static/css'),
    DIST: path.resolve(__dirname, 'static/dist'),
    IMG: path.resolve(__dirname, 'static/img'),
    JS: path.resolve(__dirname, 'static/js'),
}

const commonConfig = {
    context: path.resolve(__dirname, 'static'),
    entry: {
        app: './js/app.js',
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|png|jp(e)?g|svg)$/,
                include: paths.IMG,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            publicPath: '/static/dist/',
                        },
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    node: {
        global: false,
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    stats: { children: false },
}

module.exports = commonConfig
