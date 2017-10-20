const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const devConfig = {
    devtool: 'eval-source-map'
};

module.exports = merge(common, devConfig);
