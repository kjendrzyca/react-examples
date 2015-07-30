'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        todo: ['./todo/todo.jsx'],
        crud: ['./crud/crud.jsx'],
        chat: ['./chat/chat.jsx'],
        productPage: ['./productPage/productPage.jsx'],
        pageJsRouting: ['./pageJsRouting/pageJsRouting.jsx']
    },
    output: {
        filename: '[name]/[name].bundle.js'
    },
    module: {
        loaders: [
          { test: /\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }, // loaders can take parameters as a querystring
          { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
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