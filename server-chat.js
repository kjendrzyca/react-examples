'use strict';

var http       = require('http'),
    fs         = require('fs'),
    Router     = require('handleball.js'),
    portNumber = 8888,
    router     = new Router({ showLog: true });

router.httpGet('/chat', function(request, response) {
    fs.readFile('chat/chat.html', function(error, chatHtml) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(chatHtml);
    });
});

router.httpGet('/chat.bundle.js', function(request, response) {
    fs.readFile('chat/chat.bundle.js', function(error, chatBundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(chatBundle);
    });
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());