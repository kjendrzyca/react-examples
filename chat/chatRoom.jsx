'use strict';

var React = require('react'),
    io = require('socket.io-client'),
    ioEvents = require('./ioEvents');

var ChatRoom = React.createClass({
    _socket: {},

    propTypes: {
        username: React.PropTypes.string.isRequired
    },

    componentDidMount: function() {
        this._socket = io.connect();
        this._socket.on(ioEvents.MESSAGE, function(message) {
            console.log('message from server: ' + message);
        });
    },

    _inputSubmitted: function($event) {
        if ($event.key === 'Enter') {
            var message = this.props.username + ': ' + $event.target.value;
            console.log('sending message: ' + message);
            this._socket.emit(ioEvents.MESSAGE, message);
            $event.target.value = '';
        }
    },

    render: function() {
        return (
            <div className="ChatRoom">
                <div className="row">
                    <div className="col s6 offset-s3">
                        <input type="text" onKeyDown={ this._inputSubmitted } />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChatRoom;