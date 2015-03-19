'use strict';

var React = require('react');
var CrudList = require('./crudList.jsx');
var superagent = require('superagent');

var log = function(thingToLog) {
    console.log(thingToLog);
};

var mainContainerDiv = document.getElementById('main-container');

superagent.get('/cartoonCharacters').end(function(error, data) {
    React.render(<CrudList cartoonCharacters={ data.body } />, mainContainerDiv);
});