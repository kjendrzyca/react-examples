'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('handleball.js');
var portNumber = 8888;
var router = new Router({ showLog: true });

// TODO
router.httpGet('/pageJsRouting', function(request, response) {
    fs.readFile('pageJsRouting/pageJsRouting.html', function(error, html) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    });
});

router.httpGet('/pageJsRouting.bundle.js', function(request, response) {
    fs.readFile('pageJsRouting/pageJsRouting.bundle.js', function(error, bundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(bundle);
    });
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());