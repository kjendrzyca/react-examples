'use strict';

var React = require('react');
var CrudList = require('./crudList.jsx');
var superagent = require('superagent');

var log = function(thingToLog) {
    console.log(thingToLog);
};

var mainContainerDiv = document.getElementById('main-container');

var path = window.location.pathname;

var pathLocation = {
    crud: path === '/crud',
    cartoonCharacter: path.indexOf('/crud/cartoonCharacters/') > -1,
    cartoonCharacterId: function() {
        var startingIndex = parseInt(path.toString().lastIndexOf('/')) + 1;
        var cartoonCharacterId = path.substring(startingIndex);
        return cartoonCharacterId;
    }
};

if (pathLocation.crud) {
    superagent.get('/cartoonCharacters').end(function(error, data) {
        React.render(<CrudList cartoonCharacters={ data.body } />, mainContainerDiv);
    });
} else if (pathLocation.cartoonCharacter) {
    superagent.get('/cartoonCharacters/' + pathLocation.cartoonCharacterId()).end(function(error, data) {
        // render component here
        React.render(<h1> { data.body } </h1>, mainContainerDiv);
    });
}