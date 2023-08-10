const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    optimization: {
         minimizer: [
            new TerserPlugin({ extractComments: false }),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        filename: '[contenthash].bundle.js?name=[name].js',
        assetModuleFilename: '[contenthash][ext]',
        path: paths.DIST,
        publicPath: '/static/dist/',
        clean: true,
    },
    plugins: [
        new webpack.EnvironmentPlugin({ GA: null }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bundle.css?name=[name].css',
        }),
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
