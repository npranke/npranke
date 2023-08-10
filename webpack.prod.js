const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const commonConfig = require('./webpack.common.js')

const paths = {
    DIST: path.resolve(__dirname, 'static/dist'),
    IMG: path.resolve(__dirname, 'static/img'),
}

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
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
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    output: {
        filename: '[contenthash].bundle.js?name=[name].js',
        path: paths.DIST,
    },
    plugins: [
        new webpack.EnvironmentPlugin({ GA: null }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bundle.css?name=[name].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new CompressionPlugin({
            test: /\.(css|js)$/,
            algorithm: 'brotliCompress',
            filename: '[base].br[query].br',
        }),
        new WebpackManifestPlugin({
            fileName: 'webpack-manifest.json',
            map: (file) => {
                if (/bundle/.test(file.path)) {
                    const [
                        manifestValue,
                        manifestKey,
                    ] = file.path.split('?name=')
                    if (manifestKey) {
                        file.name = manifestKey
                    }
                    file.path = manifestValue
                }
                return file
            },
            removeKeyHash: false,
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
