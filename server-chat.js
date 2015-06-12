'use strict';

var http           = require('http'),
    fs             = require('fs'),
    socketIo       = require('socket.io'),
    Router         = require('handleball.js'),
    portNumber     = 8888,
    router         = new Router({ showLog: true }),
    ioEvents       = require('./chat/ioEvents.js'),
    connectedUsers = require('./chat/connectedUsers.js'),
    _              = require('lodash');

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

function _addToConnectedUsersList(socketId, username) {
    var user = {
        id: socketId,
        name: username
    };

    connectedUsers.add(user);
}

function _isPrivate(message) {
    return message.indexOf('@') > -1;
}

function _sendPrivateMessage(message, socket) {
    var words = message.split(' ');
    var usernames = _.filter(words, function(word) {
        return word.indexOf('@') === 0;
    });

    var messageRecipients = _.filter(connectedUsers.getAll(), function(user) {
        return _.any(usernames, function(username) {
            return username === '@' + user.name;
        });
    });

    _.forEach(messageRecipients, function(recipient) {
        socket.to(recipient.id).emit(ioEvents.MESSAGE, 'PRIVATE MESSAGE: ' + message);
    });

    socket.emit(ioEvents.MESSAGE, 'PRIVATE MESSAGE: ' + message);
}

io.on('connection', function (socket) {
    socket.on(ioEvents.USER_CONNECTED, function(username) {
        console.log('user connected: ' + username);
        _addToConnectedUsersList(socket.id, username);
        io.emit(ioEvents.USERS_LIST_UPDATED, connectedUsers.getUsernames());
    });

    socket.on(ioEvents.MESSAGE, function(message) {
        console.log('recieved message: ' + message);

        if (_isPrivate(message)) {
            _sendPrivateMessage(message, socket);
            return;
        }

        io.emit(ioEvents.MESSAGE, message);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        connectedUsers.removeById(socket.id);
        io.emit(ioEvents.USERS_LIST_UPDATED, connectedUsers.getUsernames());
    });
});

console.log('Starting localhost:' + portNumber.toString());