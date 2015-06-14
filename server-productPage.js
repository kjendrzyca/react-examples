'use strict';

var http           = require('http'),
    fs             = require('fs'),
    Router         = require('handleball.js'),
    portNumber     = 8888,
    router         = new Router({ showLog: true });

router.httpGet('/product', function(req, res) {
    fs.readFile('productPage/productPage.html', function(error, productPageHtml) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(productPageHtml);
    });
});

router.httpGet('/productPage.bundle.js', function(req, res) {
    fs.readFile('productPage/productPage.bundle.js', function(error, productPageBundle) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(productPageBundle);
    });
});

// API
router.httpPost('/product', function(req, res) {
    req.on('data', function(chunk) {
        var newProduct = JSON.parse(chunk.toString());
        console.log(newProduct);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end();
    });
});

http.createServer(function(req, res) {
    router.route(req, res);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());