const path = require('path'); // https://nodejs.org/api/

const paths = {
  DIST: path.resolve(__dirname, 'static/dist'),
  JS: path.resolve(__dirname, 'static/js'),
};

const config = {
    entry: {
        app: path.join(paths.JS, 'app.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.DIST,
    },
};

module.exports = config;
