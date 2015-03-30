'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('handleball.js');

var portNumber = 8888;

var cartoonCharacters = require('./cartoonCharactersData.js');

var router = new Router({ showLog: true });

var paths = ['/crud', '/crud/cartoonCharacters/{id}', '/crud/cartoonCharacters/new'];

router.httpGet(paths, function(request, response) {
    fs.readFile('crud/crud.html', function(error, crudHtml) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(crudHtml);
    });
});

router.httpGet('/crud.bundle.js', function(request, response) {
    fs.readFile('crud/crud.bundle.js', function(error, crudBundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(crudBundle);
    });
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