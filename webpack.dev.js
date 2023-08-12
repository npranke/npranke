const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commonConfig = require('./webpack.common')

const devConfig = {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: '[name]-[contenthash].bundle.js',
        assetModuleFilename: '[name]-[contenthash][ext]',
    },
    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].bundle.css',
        }),
    ],
}

module.exports = merge(commonConfig, devConfig)
