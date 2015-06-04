'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('handleball.js');
var portNumber = 8888;
var todos = require('./todosData.js');
var router = new Router({ showLog: true });

// TODO
router.httpGet('/todo', function(request, response) {
    fs.readFile('todo/todo.html', function(error, todoHtml) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(todoHtml);
    });
});

router.httpGet('/todo.bundle.js', function(request, response) {
    fs.readFile('todo/todo.bundle.js', function(error, todoBundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(todoBundle);
    });
});

// API TODO
router.httpGet('/todos', function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(todos));
});

router.httpPost('/todos', function(request, response) {
    request.on('data', function(chunk) {
        console.log('Added new:');
        console.log(chunk.toString());

        var parsedChunk = JSON.parse(chunk);

        var i = 500;
        parsedChunk.forEach(function(todo) {
            var newTodo = { id: i++, title: todo };
            todos.push(newTodo);
        });

        console.log(todos);
    });

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

console.log('Starting localhost:' + portNumber.toString());