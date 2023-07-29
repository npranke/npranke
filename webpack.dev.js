const path = require('path')

const Dotenv = require('dotenv-webpack')
const { mergeWithRules } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const commonConfig = require('./webpack.common.js')

const paths = {
    DIST: path.resolve(__dirname, 'static/dist'),
    IMG: path.resolve(__dirname, 'static/img'),
}

const devConfig = {
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(gif|png|jp(e)?g|svg)$/,
                include: paths.IMG,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            publicPath: '/static/dist/',
                        },
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name]-[contenthash].bundle.js',
        path: paths.DIST,
    },
    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].bundle.css',
        }),
        new WebpackManifestPlugin({
            fileName: 'webpack-manifest.json',
        }),
    ],
}

const rules = {
    module: {
        rules: {
            test: 'match',
            include: 'match',
            use: {
                loader: 'match',
                options: 'replace',
            },
        },
    },
}

module.exports = mergeWithRules(rules)(commonConfig, devConfig)
