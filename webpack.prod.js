const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    output: {
        filename: '[contenthash].bundle.js?name=[name].js',
        path: path.resolve(__dirname, 'static/dist'),
    },
    plugins: [
        new webpack.EnvironmentPlugin({ GA: null }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bundle.css?name=[name].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new CompressionPlugin({
            test: /\.(css|js)$/,
            algorithm: 'gzip',
            filename: '[base].gz[query].gz',
        }),
        new CompressionPlugin({
            test: /\.(css|js)$/,
            algorithm: 'brotliCompress',
            filename: '[base].br[query].br',
        }),
        new WebpackManifestPlugin({
            fileName: 'webpack-manifest.json',
            map: (file) => {
                if (RegExp('bundle').test(file.path)) {
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
