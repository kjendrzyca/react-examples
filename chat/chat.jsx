'use strict';

var React = require('react');
var superagent = require('superagent');
var io = require('socket.io-client');

var mainContainerDiv = document.getElementById('main-container');

var socket = io.connect();

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

React.render(<span>Chat</span>, mainContainerDiv);
