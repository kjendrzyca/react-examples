'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('handleball.js');

var portNumber = 8888;

var cartoonCharacters = [
    {
        id: 1,
        name: 'Batman',
        description: 'Lost his parents and was afraid of bats but he\'s awesome.'
    },
    {
        id: 2,
        name: 'Spider-man',
        description: 'Lost (surprise) his parents and he\'s living in NYC.'
    }
];

var crudHtml = {};
var crudBundle = {};

fs.readFile('crud/crud.html', function(error, data) {
    crudHtml = data;
});
fs.readFile('crud/crud.bundle.js', function(error, data) {
    crudBundle = data;
});

var router = new Router({ showLog: true });

router.httpGet('/crud', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(crudHtml);
});

router.httpGet('/crud/cartoonCharacters/{id}', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(crudHtml);
});

router.httpGet('/crud/cartoonCharacters/new', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(crudHtml);
});

router.httpGet('/crud.bundle.js', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/javascript'});
    response.end(crudBundle);
});

// API
router.httpGet('/cartoonCharacters', function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(cartoonCharacters));
});

router.httpGet('/cartoonCharacters/{id}', function(request, response, params) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(cartoonCharacters[params.id - 1]));
});

router.httpPut('/cartoonCharacters/{id}', function(request, response, params) {
    request.on('data', function(chunk) {
      console.log('Edited entity no. ' + params.id + ':');
      console.log(chunk.toString());
    });

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
});

router.httpPost('/cartoonCharacters', function(request, response) {
    request.on('data', function(chunk) {
      console.log('Added new:');
      console.log(chunk.toString());
    });

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
});

router.httpDelete('/cartoonCharacters/{id}', function(request, response, params) {
    console.log('Deleting no. ' + params.id);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());