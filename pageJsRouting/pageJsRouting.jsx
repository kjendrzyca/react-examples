'use strict';

var React = require('react'),
    page  = require('page');

require('../node_modules/materialize-css/bin/materialize.js');
require('../node_modules/materialize-css/bin/materialize.css');

var Main = React.createClass({
    render: function() {
        return (
            <div className="Main">
                <ul>
                    <li><a href="./pageJsRouting/home">Home</a></li>
                    <li><a href="./pageJsRouting/about">About</a></li>
                </ul>
            </div>
        );
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div className="About">
                This is about, hello!
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');

function renderHome() {
    React.render(<Main />, mainContainerDiv);
}

function renderAbout() {
    React.render(<About />, mainContainerDiv);
}

page('/pageJsRouting', renderHome);
page('/pageJsRouting/about', renderAbout);
page();