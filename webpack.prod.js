const { merge } = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    plugins: [
        new OptimizeCSSAssetsPlugin(),
        new webpack.EnvironmentPlugin({ GA: null }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
