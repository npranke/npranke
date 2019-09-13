const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    plugins: [
        new OptimizeCSSAssetsPlugin(),
        new UglifyJSPlugin(),
        new webpack.EnvironmentPlugin({ GA: null }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
