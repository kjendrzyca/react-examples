'use strict';

var React = require('react');
var superagent = require('superagent');

var TodoList = require('./todoList.jsx');

var mainContainerDiv = document.getElementById('main-container');

superagent.get('/todos').end(function(error, data) {
    React.render(<TodoList todos={ data.body }/>, mainContainerDiv);
});
