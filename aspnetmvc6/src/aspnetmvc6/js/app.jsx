'use strict';

var React = require('react');

var Menu = React.createClass({
    render: function() {
        return (
            <ul className="Menu">
                <li><a href="./">Home</a></li>
                <li><a href="./about">About</a></li>
            </ul>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div className="Home">
                <Menu />
                <div>Hello from home</div>
            </div>
        );
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div className="About">
                <Menu />
                <div>This is about, hello!</div>
            </div>
        );
    }
});

var Edit = React.createClass({
    render: function() {
        return (
            <div className="Edit">
                Editing something of id: { this.props.id }
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');
React.render(<Home />, mainContainerDiv);
