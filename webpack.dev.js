const merge = require('webpack-merge')

const commonConfig = require('./webpack.common.js')

const devConfig = {
    devtool: 'eval-source-map',
    mode: 'development',
}

module.exports = merge(commonConfig, devConfig)
