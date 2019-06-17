const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
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
                            name: '[contenthash].[ext]',
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
    optimization: {
        runtimeChunk: {
            name: (entrypoint) => { return `runtime-${entrypoint.name}` },
        },
        splitChunks: {
            automaticNameDelimiter: '-',
            chunks: 'all',
            name: true,
        },
    },
    output: {
        filename: '[id]-[contenthash].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        new ManifestPlugin({ fileName: 'webpack-assets-manifest.json' }),
        new MiniCssExtractPlugin({
            filename: '[id]-[contenthash].bundle.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    stats: { children: false },
}

module.exports = commonConfig
