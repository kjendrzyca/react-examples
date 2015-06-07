'use strict';

var React = require('react');

var LoginPage = React.createClass({
    propTypes: {
        usernameSubmittedHandler: React.PropTypes.func.isRequired
    },

    _submitUsername: function() {
        var username = this.refs.username.getDOMNode().value;

        if (!username) {
            alert("Provide username!");
            return;
        }

        this.props.usernameSubmittedHandler(username);
    },

    render: function() {
        return (
            <div className="LoginPage">
                <div className="row">
                    <div className="col s6 offset-s3 input-field">
                        <label htmlFor="username">Username:</label>
                        <input id="username" type="text" ref="username" />
                        <button className="btn success" onClick={ this._submitUsername }>Go</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginPage;