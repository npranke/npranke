const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const commonConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({ extractComments: false }),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        filename: '[contenthash].bundle.js',
        assetModuleFilename: '[contenthash][ext]',
    },
    plugins: [
        new webpack.EnvironmentPlugin({ GA: null }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bundle.css',
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
