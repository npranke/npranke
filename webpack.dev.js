const path = require('path')

const Dotenv = require('dotenv-webpack')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.common.js')

const devConfig = {
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(gif|png|jp(e)?g|svg)$/,
                include: path.resolve(__dirname, 'static/img'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash].[ext]',
                            publicPath: '/static/dist/',
                        },
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new Dotenv( { path: './.env.client' } ),
    ],
}

module.exports = merge.smart(commonConfig, devConfig)
