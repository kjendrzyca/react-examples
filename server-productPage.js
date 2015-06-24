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
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        var newProduct = JSON.parse(data);
        _saveImage(newProduct.selectedImage);

        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end();
    });
});

function _saveImage(selectedImage) {
    var data_url = selectedImage.imageBuffer;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var extension = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

    fs.writeFile(__dirname + '/_upload/' + selectedImage.name, buffer, function (error) {
        console.log(error);
    });
}

http.createServer(function(req, res) {
    router.route(req, res);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());