const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

const prodConfig = {
    plugins: [
        new UglifyJSPlugin()
    ],
};

module.exports = merge(common, prodConfig);
