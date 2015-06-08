'use strict';

var React = require('react'),
    io = require('socket.io-client'),
    ioEvents = require('./ioEvents'),
    _ = require('lodash');

var ChatRoom = React.createClass({
    _socket: {},

    propTypes: {
        username: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            messages: [],
            connectedUsers: []
        };
    },

    componentDidMount: function() {
        this._socket = io.connect();
        this._socket.emit(ioEvents.USERCONNECTED, this.props.username);

        this._socket.on(ioEvents.USERS_LIST_UPDATED, function(usersList) {
            var messages = this.state.messages;
            messages.push('new user connected');
            this.setState({ messages: messages });

            this.setState({ connectedUsers: usersList });
        }.bind(this));

        this._socket.on(ioEvents.MESSAGE, function(messageFromServer) {
            console.log('message from server: ' + messageFromServer);

            var messages = this.state.messages;
            messages.push(messageFromServer);
            this.setState({ messages: messages });
        }.bind(this));
    },

    _inputSubmitted: function($event) {
        if ($event.key === 'Enter') {
            console.log('sending message: ' + message);

            var message = this.props.username + ': ' + $event.target.value;
            this._socket.emit(ioEvents.MESSAGE, message);
            $event.target.value = '';
        }
    },

    _getMessagesList: function() {
        var messages = _.map(this.state.messages, function(message) {
            return <li>{ message }</li>;
        }, this);

        return <ul>{ messages }</ul>;
    },

    _getConnectedUsersList: function() {
        var connectedUsers = _.map(this.state.connectedUsers, function(username) {
            return <li key={ username }>{ username }</li>;
        }, this);

        return <ul>{ connectedUsers }</ul>;
    },

    render: function() {
        return (
            <div className="ChatRoom">
                <div className="row">
                    <div className="col s6">
                        <input type="text" placeholder="message..." onKeyDown={ this._inputSubmitted } />
                        { this._getMessagesList() }
                    </div>
                    <div className="col s6 offset-s3">
                        Connected users:
                        { this._getConnectedUsersList() }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChatRoom;