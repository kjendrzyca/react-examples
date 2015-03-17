'use strict';

var http = require('http');

var portNumber = 8888;

http.createServer(function(request, response) {

}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());