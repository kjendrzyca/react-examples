'use strict';

module.exports = {
    entry: {
        todo: ['./todo/todo.jsx'],
        crud: ['./crud/crud.jsx'],
        chat: ['./chat/chat.jsx']
    },
    output: {
        filename: '[name]/[name].bundle.js'
    },
    module: {
        loaders: [
          { test: /\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }, // loaders can take parameters as a querystring
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.jsx', '.json', '.coffee']
    }
};