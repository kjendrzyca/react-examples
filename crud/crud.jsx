'use strict';

var React = require('react');
var CrudList = require('./crudList.jsx');
var CrudSingleEntity = require('./crudSingleEntity.jsx');
var superagent = require('superagent');

var log = function(thingToLog) {
    console.log(thingToLog);
};

var mainContainerDiv = document.getElementById('main-container');

var path = window.location.pathname;
var pathLocation = {
    crud: path === '/crud',
    cartoonCharacterEdit: path.indexOf('/crud/cartoonCharacters/') > -1,
    cartoonCharacterAddNew: path.indexOf('/crud/cartoonCharacters/new') > -1,
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
} else if (pathLocation.cartoonCharacterAddNew) {
    superagent.get('/cartoonCharacters/new').end(function(error, data) {
        React.render(<CrudSingleEntity />, mainContainerDiv);
    });
} else if (pathLocation.cartoonCharacterEdit) {
    superagent.get('/cartoonCharacters/' + pathLocation.cartoonCharacterId()).end(function(error, data) {
        React.render(<CrudSingleEntity cartoonCharacter={ data.body } isEditForm={ true } />, mainContainerDiv);
    });
}