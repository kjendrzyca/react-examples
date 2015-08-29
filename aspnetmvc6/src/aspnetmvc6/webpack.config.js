'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./js/app.jsx'],
    },
    output: {
        filename: 'wwwroot/bundle.js'
    },
    module: {
        loaders: [
          { test: /\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.coffee']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })
    ]
};