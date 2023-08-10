const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = {
    __MOCKS__: path.resolve(__dirname, 'static/js/__mocks__'),
    COMPONENTS: path.resolve(__dirname, 'static/js/components'),
    CONSTANTS: path.resolve(__dirname, 'static/js/constants'),
    CSS: path.resolve(__dirname, 'static/css'),
    DIST: path.resolve(__dirname, 'static/dist'),
    IMG: path.resolve(__dirname, 'static/img'),
    JS: path.resolve(__dirname, 'static/js'),
    UTILS: path.resolve(__dirname, 'static/js/utils.js'),
}

const commonConfig = {
    context: path.resolve(__dirname, 'static'),
    entry: {
        app: './js/app.js',
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                include: paths.JS,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { cacheDirectory: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: paths.CSS,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
    node: {
        global: false,
    },
    optimization: {
        runtimeChunk: {
            name: (entrypoint) => { return `runtime-${entrypoint.name}` },
        },
        splitChunks: {
            automaticNameDelimiter: '-',
            chunks: 'all',
            name: true,
        },
    },
    resolve: {
        alias: {
            '@__mocks__': paths.__MOCKS__,
            '@components': paths.COMPONENTS,
            '@constants': paths.CONSTANTS,
            '@css': paths.CSS,
            '@img': paths.IMG,
            '@utils$': paths.UTILS,
        },
        extensions: ['.js', '.jsx'],
    },
    stats: { children: false },
}

module.exports = commonConfig
