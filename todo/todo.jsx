'use strict';

var React = require('react');
var superagent = require('superagent');

var TodoList = require('./todoList.jsx');

var mainContainerDiv = document.getElementById('main-container');

var saveNewTodos = function(newTodos) {
    superagent.post('/todos').send(newTodos).end(function() {
        location.reload();
    });
};

superagent.get('/todos').end(function(error, data) {
    React.render(<TodoList todos={ data.body } saveNewTodosHandler={ saveNewTodos }/>, mainContainerDiv);
});
