'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('./router');

var portNumber = 8888;

var router = new Router({ showLog: true });

router.httpGet('/crud', function(request, response) {
    fs.readFile('crud/crud.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

router.httpGet('/crud.js', function(request, response) {
    fs.readFile('crud/crud.js', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(data);
    });
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());