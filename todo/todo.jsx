'use strict';

var React = require('react');
var superagent = require('superagent');

var TodoList = require('./todoList.jsx');

var mainContainerDiv = document.getElementById('main-container');

React.render(<TodoList />, mainContainerDiv);