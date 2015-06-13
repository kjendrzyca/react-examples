'use strict';

var http           = require('http'),
    fs             = require('fs'),
    Router         = require('handleball.js'),
    portNumber     = 8888,
    router         = new Router({ showLog: true });

router.httpGet('/product', function(request, response) {
    fs.readFile('productPage/productPage.html', function(error, productPageHtml) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(productPageHtml);
    });
});

router.httpGet('/productPage.bundle.js', function(request, response) {
    fs.readFile('productPage/productPage.bundle.js', function(error, productPageBundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(productPageBundle);
    });
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());