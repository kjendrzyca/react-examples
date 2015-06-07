'use strict';

var React = require('react');
var LoginPage = require('./loginPage'),
    ChatRoom = require('./chatRoom');

var mainContainerDiv = document.getElementById('main-container');

function usernameSubmittedHandler(username) {
    var chatRoom = <ChatRoom username={ username }/>;
    React.render(chatRoom, mainContainerDiv);
}

var loginPage = <LoginPage usernameSubmittedHandler={ usernameSubmittedHandler } />;
React.render(loginPage, mainContainerDiv);