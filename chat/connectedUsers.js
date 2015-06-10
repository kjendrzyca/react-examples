'use strict';

var _ = require('lodash');

var _usersList = [];

var connectedUsers = {
    add: function(user) {
        _usersList.push(user);
    },
    removeById: function(id) {
        _.remove(_usersList, function(user) {
            return user.id === id;
        });
    },
    getUsernames: function() {
        var usernames = _.map(_usersList, function(user) {
            return user.name;
        });

        return usernames;
    }
};

module.exports = connectedUsers;