'use strict';

var http       = require('http'),
    fs         = require('fs'),
    socketIo   = require('socket.io'),
    _          = require('lodash'),
    Router     = require('handleball.js'),
    portNumber = 8888,
    router     = new Router({ showLog: true }),
    ioEvents   = require('./chat/ioEvents.js');

router.httpGet('/chat', function(request, response) {
    fs.readFile('chat/chat.html', function(error, chatHtml) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(chatHtml);
    });
});

router.httpGet('/chat.bundle.js', function(request, response) {
    fs.readFile('chat/chat.bundle.js', function(error, chatBundle) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(chatBundle);
    });
});

var server = http.createServer(function(request, response) {
    router.route(request, response);
}).listen(portNumber);

var io = socketIo.listen(server);

var connectedUsers = [];

function _addToConnectedUsersList(socketId, username) {
    var user = {
        id: socketId,
        name: username
    };

    connectedUsers.push(user);
}

io.on('connection', function (socket) {
    socket.on(ioEvents.USER_CONNECTED, function(username) {
        console.log('user connected: ' + username);

        _addToConnectedUsersList(socket.id, username);

        var usernames = _.map(connectedUsers, function(user) {
            return user.name;
        });
        io.emit(ioEvents.USERS_LIST_UPDATED, usernames);
    });

    socket.on(ioEvents.MESSAGE, function(message) {
        console.log('recieved message: ' + message);
        io.emit(ioEvents.MESSAGE, message);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

console.log('Starting localhost:' + portNumber.toString());