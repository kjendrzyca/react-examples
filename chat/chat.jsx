'use strict';

var React = require('react');
var io = require('socket.io-client');
var LoginPage = require('./loginPage');

var mainContainerDiv = document.getElementById('main-container');

var socket = io.connect();

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

var usernameSubmittedHandler = function(username) {
    alert(username);
};

var loginPage = <LoginPage usernameSubmittedHandler={ usernameSubmittedHandler } />;
React.render(loginPage, mainContainerDiv);