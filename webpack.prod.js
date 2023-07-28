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
        filename: '[contenthash].js?name=[name].js',
        path: path.resolve(__dirname, 'static/dist'),
    },
    plugins: [
        new webpack.EnvironmentPlugin({ GA: null }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css?name=[name].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new CompressionPlugin({
            deleteOriginalAssets: true,
            filename: '[name].bundle[ext].gz[query]',
        }),
        new WebpackManifestPlugin({
            fileName: 'webpack-manifest.json',
            filter: (file) => { return file.isChunk === false },
            map: (file) => {
                if (file.name.includes('.gz?name=')) {
                    const [
                        compressedPath,
                        compressedName,
                    ] = file.name.split('?name=')
                    file.path = compressedPath
                    file.name = compressedName
                }
                return file
            },
            removeKeyHash: false,
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
