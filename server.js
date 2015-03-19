'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('./router');

var portNumber = 8888;

var cartoonCharacters = [
    {
        name: 'Batman',
        description: 'Lost his parents and was afraid of bats but he\'s awesome.`'
    },
    {
        name: 'Spider-man',
        description: 'Lost (surprise) his parents and he\'s living in NYC.'
    }
];

var router = new Router({ showLog: true });

router.httpGet('/crud', function(request, response) {
    fs.readFile('crud/crud.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

router.httpGet('/crud.bundle.js', function(request, response) {
    fs.readFile('crud/crud.bundle.js', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(data);
    });
});

router.httpGet('/cartoonCharacters', function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(cartoonCharacters));
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());